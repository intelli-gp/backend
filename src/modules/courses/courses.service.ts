import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/common/dto';
import { UdemyApiResponse } from './types/udemy-response';
import { TagsService } from '../tags/tags.service';
import { udemyCourseCategories } from './constants';
import { previewRequiredCourseFields } from './constants/udemy-course-fields';

export type UdemyCourseCategory = (typeof udemyCourseCategories)[number];

@Injectable()
export class CoursesService {
  private coursesServiceLogger = new Logger(CoursesService.name);

  constructor(
    private readonly tagsService: TagsService,
    private readonly udemyHttpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}
  async getRecommendedCourses(paginationData: PaginationDto, userId: number) {
    this.coursesServiceLogger.log(
      `Getting recommended courses for user ${userId}`,
    );

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

    const tagsQuery = userTags.map((tag) => tag.tag_name).join(' ');

    const coursesObservable = this.udemyHttpService
      .get(
        `/courses/?search=${tagsQuery}&ordering=relevance&ratings=4&page_size=${+paginationData.limit}&page=${
          +paginationData.offset || 1
        }&fields[course]=${previewRequiredCourseFields.join(',')}`,
      )
      .pipe(map((response) => response?.data));

    const recommendedCoursesResponse: UdemyApiResponse =
      await lastValueFrom(coursesObservable);

    return recommendedCoursesResponse;
  }

  async getAllCourseCategories() {
    this.coursesServiceLogger.log(`Getting all course categories`);

    const udemyCategoriesPreview = await Promise.all(
      udemyCourseCategories.map(async (category) => {
        const categoryCoursesObservable = this.udemyHttpService
          .get(
            `/courses/?fields[course]=${previewRequiredCourseFields.join(
              ',',
            )}&category=${encodeURIComponent(category)}&page_size=10`,
          )
          .pipe(map((response) => response?.data));

        const categoryCoursesResponse: UdemyApiResponse = await lastValueFrom(
          categoryCoursesObservable,
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

  async searchCourses(
    searchQuery: string,
    paginationData: PaginationDto,
  ): Promise<UdemyApiResponse> {
    /**
     * We order by relevance because any other filter is manageable in frontend or after we get the data
     * price , rating , etc
     * but relevance can only be done from their side
     */
    this.coursesServiceLogger.log(
      `Searching for courses with query ${searchQuery}`,
    );
    this.coursesServiceLogger.debug({ test: +paginationData.offset || 1 });
    const coursesObservable = this.udemyHttpService
      .get(
        `/courses/?search=${searchQuery}&ordering=relevance&ratings=4&page_size=${+paginationData.limit}&page=${
          +paginationData.offset || 1
        }&fields[course]=${previewRequiredCourseFields.join(',')}`,
      )
      .pipe(map((response) => response?.data));

    const searchedCoursesResponse: UdemyApiResponse =
      await lastValueFrom(coursesObservable);

    this.coursesServiceLogger.debug({
      searchedCoursesResponseCount: searchedCoursesResponse?.count,
      nextUrl: searchedCoursesResponse?.next,
    });

    return searchedCoursesResponse;
  }

  /**
   *
   * @param category one of the udemy course categories defined in constants folder
   */
  async getCoursesByCategory(
    category: (typeof udemyCourseCategories)[number],
    paginationData: PaginationDto,
  ): Promise<UdemyApiResponse> {
    this.coursesServiceLogger.log(`Getting courses for category ${category}`);

    // Failsafe to prevent invalid categories (in case dto validation fails)
    if (!udemyCourseCategories.includes(category) || !category) {
      throw new Error('Invalid category');
    }

    const categoryCoursesObservable = this.udemyHttpService
      .get(
        `/courses/?category=${encodeURIComponent(category)}&page_size=${
          paginationData.limit
        }&page=${
          +paginationData.offset || 1
        }&fields[course]=${previewRequiredCourseFields.join(',')}`,
      )
      .pipe(map((response) => response?.data));

    const categoryCoursesResponse: UdemyApiResponse = await lastValueFrom(
      categoryCoursesObservable,
    );

    return categoryCoursesResponse;
  }
}
