import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { PaginationDto } from '../../common/dto';
import { RecommenderSystemService } from './recommender-system.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MultipleArticlesExample } from '../articles/swagger-examples';
import { swaggerSuccessExample } from '../../utils/swagger/example-generator';
import { multipleGroupsExample } from '../chat-groups/swagger-examples';
import { sendSuccessResponse } from '../../utils/response-handler/success.response-handler';
import { SerializedArticle } from '../articles/serialized-types/article.serialized';
import { DeleteArticleDto } from '../articles/dto';

// TODO: Implement the Methods
@Controller('recommender-system')
@ApiTags('recommender-system')
export class RecommenderSystemController {
  constructor(
    private readonly recommenderSystemService: RecommenderSystemService,
  ) {}

  @HttpCode(200)
  @HttpCode(400)
  @ApiOkResponse({
    description: 'Returns article recommendations with pagination',
    schema: swaggerSuccessExample(null, MultipleArticlesExample),
  })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @Get('articles/:articleId([0-9]+)')
  async getArticleRecommendations(
    @Query() paginationData: PaginationDto,
    @Param() idDto: DeleteArticleDto,
  ) {
    const articles =
      await this.recommenderSystemService.getArticleRecommendations(
        paginationData,
        idDto,
      );

    return sendSuccessResponse(
      articles.map((article) => new SerializedArticle(article)),
    );
  }

  @HttpCode(200)
  @HttpCode(400)
  @ApiOkResponse({
    description: 'Returns article recommendations with pagination',
    schema: swaggerSuccessExample(null, multipleGroupsExample),
  })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @Get('groups')
  async getGroupRecommendations(paginationData: PaginationDto) {
    const groups =
      await this.recommenderSystemService.getGroupRecommendations(
        paginationData,
      );
    return groups;
  }

  // TODO: add swagger example for the return object in OK Response
  @HttpCode(200)
  @HttpCode(400)
  @ApiOkResponse({
    description: 'Returns article recommendations with pagination',
    schema: swaggerSuccessExample(null, {}),
  })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @Get('users')
  async getUsersRecommendations(paginationData: PaginationDto) {
    const users =
      await this.recommenderSystemService.getUserRecommendation(paginationData);
    return users;
  }

  // TODO: add swagger example for the return object in OK Response
  @HttpCode(200)
  @HttpCode(400)
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @Get('courses')
  async getCoursesRecommendations(paginationData: PaginationDto) {
    const courses =
      await this.recommenderSystemService.getCourseRecommendation(
        paginationData,
      );
    return courses;
  }
}
