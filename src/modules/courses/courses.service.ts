import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/common/dto';
import { UdemyApiResponse } from './types/udemy-response';
import { udemyCourseCategories } from './constants';
import { previewRequiredCourseFields } from './constants/udemy-course-fields';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { UdemyCourseCategoryEnum } from './types';
import * as _ from 'lodash';

@Injectable()
export class CoursesService {
  private coursesServiceLogger = new Logger(CoursesService.name);

  constructor(
    private readonly udemyHttpService: HttpService,
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getRecommendedCourses(paginationData: PaginationDto, userId: number) {
    this.coursesServiceLogger.log(
      `Getting recommended courses for user ${userId}`,
    );

    this.coursesServiceLogger.debug({
      paginationData,
    });
    // await this.cacheManager.reset();
    const userCacheKey = `recommended-courses-${userId}-${paginationData.limit}-${paginationData.offset}`;
    const cachedRecommendedCourses = await this.cacheManager.get(userCacheKey);
    if (cachedRecommendedCourses) {
      return cachedRecommendedCourses as UdemyApiResponse;
    }
    /**
     * Naiive recommendation using Udemy API Search capabilities
     * Steps:
     * 1. Get all User Tags
     * 2. append the tags to one big string
     * 3. Search for courses with that string query
     * 4. filter out the primary category from the results
     * 5. return the results and the filtered categories
     */
    const userTags = await this.prismaService.user_tag.findMany({
      where: { user_id: userId },
    });

    // TODO: this approach needs to change because once the tags increase udemy does not replyyes
    // We set a max Size to at least get some results
    const maxTags = 10;
    const tagsQuery = userTags
      .map((tag) => tag.tag_name)
      .slice(0, maxTags)
      .join(',');

    const recommendedCoursesResponse = await this.searchCourses(
      tagsQuery,
      paginationData,
      null,
      { isRecommendation: true },
    );

    await this.cacheManager.set(
      userCacheKey,
      recommendedCoursesResponse,
      3600 * 1000,
    );

    return recommendedCoursesResponse;
  }

  async getAllCourseCategories() {
    this.coursesServiceLogger.log(`Getting all course categories`);

    const udemyCategoriesPreview = await Promise.all(
      udemyCourseCategories.map(async (category) => {
        const categoryCoursesResponse: UdemyApiResponse =
          await this.searchCourses(
            category,
            {
              limit: 10,
              offset: 1,
            },
            category,
            {
              isPreview: true,
            },
          );

        this.coursesServiceLogger.debug({
          category,
          categoryCoursesResponseCount: categoryCoursesResponse?.count,
        });

        const categoryCourses = categoryCoursesResponse?.results;

        return {
          category,
          courses: categoryCourses,
        };
      }),
    );

    return udemyCategoriesPreview;
  }

  async nonBlockingWait(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, ms);
    });
  }

  async searchCourses(
    searchQuery: string,
    paginationData: PaginationDto,
    category?: UdemyCourseCategoryEnum,
    {
      isRecommendation,
      isPreview,
    }: { isRecommendation?: boolean; isPreview?: boolean } = {
      isRecommendation: false,
      isPreview: false,
    },
  ): Promise<UdemyApiResponse> {
    this.coursesServiceLogger.log(
      `Searching for courses with query ${searchQuery}`,
    );

    this.coursesServiceLogger.debug({
      searchQuery,
      paginationData,
      category,
    });

    const cacheKey = `searched-courses-${_.kebabCase(searchQuery)}-${
      paginationData.limit
    }-${paginationData.offset}`;
    // these flags help not to cache the recommendation and preview results
    // as they will not be used and only take space
    if (!isRecommendation || !isPreview) {
      const cachedCaseInsensitiveSearch = await this.cacheManager.get(cacheKey);
      if (cachedCaseInsensitiveSearch) {
        return cachedCaseInsensitiveSearch as UdemyApiResponse;
      }
    }

    const cleanUrl = `/courses/?search=${encodeURIComponent(
      searchQuery,
    )}&ordering=most-reviewed&ratings=4&page_size=${+paginationData.limit}&page=${
      +paginationData.offset || 1
    }${
      category ? `&category=${encodeURIComponent(category)}` : ''
    }&fields[course]=${previewRequiredCourseFields.join(',')}`;

    // Custom retry mechanism
    const retries = 5;
    let failureCount = 0;
    let resError = null;

    for (let i = 0; i < retries; i++) {
      try {
        const coursesObservable = this.udemyHttpService
          .get(cleanUrl)
          .pipe(map((response) => response?.data));

        const searchedCoursesResponse: UdemyApiResponse =
          await lastValueFrom(coursesObservable);

        this.coursesServiceLogger.debug({
          searchedCoursesResponseCount: searchedCoursesResponse?.count,
          nextUrl: searchedCoursesResponse?.next,
        });

        if (!isRecommendation) {
          await this.cacheManager.set(
            cacheKey,
            searchedCoursesResponse,
            3600 * 1000,
          );
        }
        return searchedCoursesResponse;
      } catch (e) {
        failureCount++;
        resError = e;
        this.coursesServiceLogger.error({
          error: e,
          retry: i,
        });
        await this.nonBlockingWait(1000);
      }
    }
    if (failureCount === retries) {
      throw new Error(resError);
    }
  }
}
