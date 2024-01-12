import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetCurrentUser, Public } from '../auth/ParamDecorator';
import { sendSuccessResponse } from 'src/utils/response-handler/success.response-handler';
import { SerializedArticle } from './serialized-types/article.serialized';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { swaggerSuccessExample } from 'src/utils/swagger/example-generator';
import { CreateArticleExample } from './swagger-examples';
import { DeleteArticleDto } from './dto';

@Controller('articles')
@ApiTags('Articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

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

  @Public()
  @Get('/:articleId')
  async getArticle(@Param() articleData: DeleteArticleDto) {
    const article = await this.articlesService.getArticle(
      articleData.articleId,
    );
    return sendSuccessResponse(new SerializedArticle(article));
  }

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
