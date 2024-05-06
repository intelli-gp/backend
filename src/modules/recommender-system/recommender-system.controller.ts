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
import { SerializedUser } from '../users/serialized-types/serialized-user';
import { GetSingleUserDto } from '../users/dto/get-user.dto';
import { GetCurrentUser } from '../auth/ParamDecorator';

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
    description:
      'Returns article recommendations with pagination based on the article id',
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
      await this.recommenderSystemService.getSpecificArticleRecommendations(
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
    description:
      'Returns User recommendations with pagination based on the user id',
    schema: swaggerSuccessExample(null),
  })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @Get('users/:Username')
  async getUserRecommendations(
    @Query() paginationData: PaginationDto,
    @Param() usernameDto: GetSingleUserDto,
  ) {
    const users =
      await this.recommenderSystemService.getSpecificUserRecommendations(
        paginationData,
        usernameDto,
      );

    return sendSuccessResponse(users.map((user) => new SerializedUser(user)));
  }

  @HttpCode(200)
  @HttpCode(400)
  @ApiOkResponse({
    description:
      'Returns article recommendations with pagination based on the interests of the user',
    schema: swaggerSuccessExample(null, MultipleArticlesExample),
  })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @Get('articles')
  async getGeneralArticleRecommendations(
    @Query() paginationData: PaginationDto,
    @GetCurrentUser('user_id') userId,
  ) {
    const articles =
      await this.recommenderSystemService.getGeneralArticleRecommendations(
        paginationData,
        userId,
      );

    return sendSuccessResponse(
      articles.map((article) => new SerializedArticle(article)),
    );
  }

  @HttpCode(200)
  @HttpCode(400)
  @ApiOkResponse({
    description:
      'Returns User recommendations with pagination based on the interests of the user',
    schema: swaggerSuccessExample(null),
  })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @Get('users')
  async getGeneralUserRecommendations(
    @Query() paginationData: PaginationDto,
    @GetCurrentUser('user_id') userId,
  ) {
    const users =
      await this.recommenderSystemService.getGeneralUserRecommendations(
        paginationData,
        userId,
      );

    return sendSuccessResponse(users.map((user) => new SerializedUser(user)));
  }
}
