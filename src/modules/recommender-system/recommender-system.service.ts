import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationDto } from '../../common/dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { DeleteArticleDto } from '../articles/dto';
import { GetSingleUserDto } from '../users/dto/get-user.dto';

@Injectable()
export class RecommenderSystemService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly recommenderHttpService: HttpService,
  ) {}

  async getSpecificArticleRecommendations(
    paginationData: PaginationDto,
    idDto: DeleteArticleDto,
  ) {
    const article = await this.prismaService.article.findUnique({
      where: { article_id: idDto.articleId },
    });

    if (!article) throw new BadRequestException('Article not found');

    const { data } = await this.getData(idDto.articleId, 'article');
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

  async getSpecificGroupRecommendations(paginationData: PaginationDto) {}

  async getSpecificUserRecommendations(
    paginationData: PaginationDto,
    usernameDto: GetSingleUserDto,
  ) {
    const user = await this.prismaService.user.findUnique({
      where: { username: usernameDto.Username },
    });

    if (!user) throw new BadRequestException('User not found');

    const { data } = await this.getData(user.user_id, 'user');
    const userNeeded = data.slice(
      paginationData.offset,
      paginationData.offset + paginationData.limit,
    );

    const userNums = userNeeded.map((user) => Number(user[0]));

    const users = await this.prismaService.user.findMany({
      where: {
        user_id: {
          in: userNums,
        },
      },
    });
    return users;
  }

  async getGeneralArticleRecommendations(
    paginationData: PaginationDto,
    userId: number,
  ) {
    const { data } = await this.getData(userId, 'general-article');
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

  async getGeneralGroupRecommendations(paginationData: PaginationDto) {}

  async getGeneralUserRecommendations(
    paginationData: PaginationDto,
    userId: number,
  ) {
    const { data } = await this.getData(userId, 'general-user');
    const userNeeded = data.slice(
      paginationData.offset,
      paginationData.offset + paginationData.limit,
    );

    const userNums = userNeeded.map((user) => Number(user[0]));

    const users = await this.prismaService.user.findMany({
      where: {
        user_id: {
          in: userNums,
        },
      },
    });
    return users;
  }

  private async getData(
    id: number,
    type:
      | 'user'
      | 'article'
      | 'group'
      | 'general-article'
      | 'general-user'
      | 'general-group',
  ): Promise<AxiosResponse<number[]>> {
    const urlPath = `/${type}-recommendations/${id}`;

    return await this.recommenderHttpService.axiosRef.get(urlPath);
  }
}
