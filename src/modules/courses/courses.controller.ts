import {
  Controller,
  Get,
  Logger,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto';
import { GetCurrentUser } from '../auth/ParamDecorator';
import {
  SerializedPaginatedUdemyCourses,
  SerializedUdemyCourse,
} from './serialized-types';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { GetCourseByCategoryDto, SearchDto } from './dto';
import { sendSuccessResponse } from 'src/utils/response-handler/success.response-handler';
import { udemyCourseCategories } from './constants';

@Controller('courses')
@ApiTags('Courses')
export class CoursesController {
  private coursesControllerLogger = new Logger(CoursesController.name);
  constructor(private readonly coursesService: CoursesService) {}
  @Get()
  @CacheKey('recommended-courses')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 10)
  async getRecommendedCourses(
    @Query() paginationData: PaginationDto,
    @GetCurrentUser('user_id') userId: number,
  ) {
    const recommendations = await this.coursesService.getRecommendedCourses(
      paginationData,
      userId,
    );
    return sendSuccessResponse(
      new SerializedPaginatedUdemyCourses(recommendations),
    );
  }

  @Get('/preview')
  @CacheKey('categories-preview')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 60)
  async GetCategoriesPreview() {
    return (await this.coursesService.getAllCourseCategories())?.map(
      (categoryCourses) => {
        return {
          category: categoryCourses?.category,
          courses: categoryCourses?.courses.map(
            (course) => new SerializedUdemyCourse(course),
          ),
        };
      },
    );
  }
  @Get('/search')
  @UseInterceptors(CacheInterceptor)
  async searchCourses(@Query() searchData: SearchDto) {
    this.coursesControllerLogger.debug({ searchData });
    const searchResults = await this.coursesService.searchCourses(
      searchData.query,
      {
        limit: searchData.limit,
        offset: searchData.offset,
      },
    );
    return sendSuccessResponse(
      new SerializedPaginatedUdemyCourses(searchResults),
    );
  }

  @Get('/:category')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 60)
  async getCoursesByCategory(
    @Query() paginationData: PaginationDto,
    @Param() categoryData: GetCourseByCategoryDto,
  ) {
    this.coursesService.getAllCourseCategories();
    const categoryCourses = await this.coursesService.getCoursesByCategory(
      categoryData.category as (typeof udemyCourseCategories)[number],
      paginationData,
    );
    return sendSuccessResponse(
      new SerializedPaginatedUdemyCourses(categoryCourses),
    );
  }
}
