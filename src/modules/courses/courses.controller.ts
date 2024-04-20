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
  @CacheTTL(3600)
  async GetCategoriesPreview() {
    this.coursesControllerLogger.error('Getting categories preview');
    const coursesByCategories = (
      await this.coursesService.getAllCourseCategories()
    )?.map((categoryCourses) => {
      return {
        Category: categoryCourses?.category,
        Courses: categoryCourses?.courses.map(
          (course) => new SerializedUdemyCourse(course),
        ),
      };
    });

    return sendSuccessResponse(coursesByCategories);
  }
  @Get('/search')
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
}
