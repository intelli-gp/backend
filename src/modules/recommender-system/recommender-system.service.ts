import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationDto } from '../../common/dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { DeleteArticleDto } from '../articles/dto';

@Injectable()
export class RecommenderSystemService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async getArticleRecommendations(
    paginationData: PaginationDto,
    idDto: DeleteArticleDto,
  ) {
    const article = await this.prismaService.article.findUnique({
      where: { article_id: idDto.articleId },
    });

    if (!article) throw new BadRequestException('Article not found');

    const { data } = await this.getData(idDto);
    const articleNeeded = data.slice(
      paginationData.offset,
      paginationData.offset + paginationData.limit,
    );

    const articleNums = articleNeeded.map((article) => Number(article[0]));

    const articles = await this.prismaService.article.findMany({
      where: {
        article_id: {
          in: articleNums,
        },
      },
      include: {
        article_tag: true,
        user: {
          include: {
            followed_by: true,
          },
        },
        articles_content: true,
        article_likes: {
          include: {
            user: true,
          },
        },
        article_comments: {
          include: {
            user: true,
            article_comment_likes: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return articles;
  }

  async getData(idDto: DeleteArticleDto): Promise<AxiosResponse<number[]>> {
    const url = `http://recommender:5000/article-recommendations/${idDto.articleId}`;

    return await this.httpService.axiosRef.get(url);
  }
  async getGroupRecommendations(paginationData: PaginationDto) {}

  async getUserRecommendation(paginationData: PaginationDto) {}

  async getCourseRecommendation(paginationData: PaginationDto) {}
}
