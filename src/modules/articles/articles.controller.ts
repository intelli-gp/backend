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
import { CreateArticleExample } from './swagger-examples';
import { DeleteArticleDto, UpdateArticleDto } from './dto';
import { GetArticleDto } from './dto/get-article.dto';
import { PaginationDto } from 'src/common/dto';
import { MultipleArticlesExample } from './swagger-examples/multiple-articles.example';

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
  @Get('/:articleId')
  async getArticle(@Param() articleData: DeleteArticleDto) {
    const article = await this.articlesService.getArticle(
      articleData.articleId,
    );
    return sendSuccessResponse(new SerializedArticle(article));
  }

  @ApiResponse({
    status: 200,
    description: 'Returns updated article',
    schema: swaggerSuccessExample(null, CreateArticleExample),
  })
  @Patch('/:articleId')
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
  @Delete('/:articleId')
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
