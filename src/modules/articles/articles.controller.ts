import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetCurrentUser, Public } from '../auth/ParamDecorator';
import { sendSuccessResponse } from 'src/utils/response-handler/success.response-handler';
import { SerializedArticle } from './serialized-types/article.serialized';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { swaggerSuccessExample } from 'src/utils/swagger/example-generator';
import {
  CreateArticleExample,
  commentOnArticleExample,
  likeArticleExample,
} from './swagger-examples';
import {
  CreateCommentDto,
  DeleteArticleDto,
  GetCommentDto,
  UpdateArticleDto,
} from './dto';
import { GetArticleDto } from './dto/get-article.dto';
import { PaginationDto } from 'src/common/dto';
import { MultipleArticlesExample } from './swagger-examples/multiple-articles.example';
import { SerializedUser } from '../users/serialized-types/serialized-user';
import { SerializedArticleComment } from './serialized-types/article-comment.serializer';

@Controller('articles')
@ApiTags('Articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Public()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns articles',
    schema: swaggerSuccessExample(null, MultipleArticlesExample),
  })
  async getArticles(@Query() paginationData: PaginationDto) {
    const articles = await this.articlesService.getAllArticles(paginationData);
    return sendSuccessResponse(
      articles.map((article) => new SerializedArticle(article)),
    );
  }

  // TODO: look up convention to name similar endpoints
  @Get('/created')
  @ApiResponse({
    status: 200,
    description: 'Returns articles created by user',
    schema: swaggerSuccessExample(null, MultipleArticlesExample),
  })
  async getArticlesCreatedByUser(
    @Query() paginationData: PaginationDto,
    @GetCurrentUser('user_id') userId: number,
  ) {
    const articles = await this.articlesService.getArticlesCreatedByUser(
      paginationData,
      userId,
    );
    return sendSuccessResponse(
      articles.map((article) => new SerializedArticle(article)),
    );
  }

  @ApiResponse({
    status: 201,
    description: 'Returns created article',
    schema: swaggerSuccessExample(null, CreateArticleExample),
  })
  @Post()
  async createArticle(
    @Body() articleData: CreateArticleDto,
    @GetCurrentUser('user_id') userId: number,
  ) {
    const createdArticle = await this.articlesService.createArticle(
      articleData,
      userId,
    );
    return sendSuccessResponse(new SerializedArticle(createdArticle));
  }

  @ApiResponse({
    status: 200,
    description: 'Returns article',
    schema: swaggerSuccessExample(null, CreateArticleExample),
  })
  @Public()
  @Get('/:articleId([0-9]+)')
  async getArticle(@Param() articleData: DeleteArticleDto) {
    const article = await this.articlesService.getArticle(
      articleData.articleId,
    );
    return sendSuccessResponse(new SerializedArticle(article));
  }

  @ApiResponse({
    status: 200,
    description: 'Toggle like on article',
    schema: swaggerSuccessExample(null, likeArticleExample),
  })
  @Post('/:articleId([0-9]+)/toggle-like')
  async toggleLikeArticle(
    @GetCurrentUser('user_id') userId: number,
    @Param() articleData: DeleteArticleDto,
  ) {
    // TODO: may need to divide this to two endpoints as removing the like add nothing to the server resources
    const articleLike = await this.articlesService.toggleLikeArticle(
      articleData.articleId,
      userId,
    );
    return sendSuccessResponse(new SerializedUser(articleLike.user));
  }

  @ApiResponse({
    status: 201,
    description: 'Returns created comment',
    schema: swaggerSuccessExample(null, commentOnArticleExample),
  })
  @Post('/:articleId([0-9]+)/comment')
  async commentOnArticle(
    @Body() commentData: CreateCommentDto,
    @GetCurrentUser('user_id') userId: number,
    @Param() articleData: DeleteArticleDto,
  ) {
    const comment = await this.articlesService.createCommentOnArticle(
      articleData.articleId,
      userId,
      commentData.Content,
    );
    return sendSuccessResponse(new SerializedArticleComment(comment));
  }

  @ApiResponse({
    status: 200,
    description: 'Returns updated comment',
    schema: swaggerSuccessExample(null, commentOnArticleExample),
  })
  @Patch('/:articleId([0-9]+)/comment/:commentId([0-9]+)')
  async updateCommentOnArticle(
    @Body() updatedCommentData: CreateCommentDto,
    @GetCurrentUser('user_id') userId: number,
    @Param() updateFilters: GetCommentDto,
  ) {
    // TODO: decide whether to remove the articleId from the filters as it is not used as of now

    const comment = await this.articlesService.updateCommentOnArticle(
      updateFilters.commentId,
      userId,
      updatedCommentData.Content,
    );
    return sendSuccessResponse(new SerializedArticleComment(comment));
  }

  @ApiResponse({
    status: 200,
    description: 'Returns confirmation for deletion',
  })
  @Delete('/:articleId([0-9]+)/comment/:commentId([0-9]+)')
  async deleteCommentOnArticle(
    @GetCurrentUser('user_id') userId: number,
    @Param() deletionFilters: GetCommentDto,
  ) {
    await this.articlesService.deleteCommentOnArticle(
      deletionFilters.articleId,
      deletionFilters.commentId,
      userId,
    );
    return sendSuccessResponse('Comment deleted successfully');
  }

  @ApiResponse({
    status: 200,
    description: 'Returns updated article',
    schema: swaggerSuccessExample(null, CreateArticleExample),
  })
  @Patch('/:articleId([0-9]+)')
  async updateArticle(
    @Body() articleData: UpdateArticleDto,
    @Param() articleIdentifier: GetArticleDto,
    @GetCurrentUser('user_id') userId: number,
  ) {
    const updatedArticle = await this.articlesService.updateArticle(
      articleData,
      articleIdentifier.articleId,
      userId,
    );
    return sendSuccessResponse(new SerializedArticle(updatedArticle));
  }

  @ApiResponse({
    status: 200,
    description: 'Return confirmation for deletion',
  })
  @Delete('/:articleId([0-9]+)')
  async deleteArticle(
    @GetCurrentUser('user_id') userId: number,
    @Param() articleData: DeleteArticleDto,
  ) {
    const deletedArticle = await this.articlesService.deleteArticle(
      articleData.articleId,
      userId,
    );
    return sendSuccessResponse(deletedArticle);
  }
}
