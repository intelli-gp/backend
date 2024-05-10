import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationDto } from '../../common/dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { DeleteArticleDto } from '../articles/dto';
import { GetSingleUserDto } from '../users/dto/get-user.dto';
import { GetSingleChatGroupDto } from '../chat-groups/dto';
import { group } from '@prisma/client';

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

  async getSpecificGroupRecommendations(
    paginationData: PaginationDto,
    chatGroupDto: GetSingleChatGroupDto,
  ): Promise<group[]> {
    const group = await this.prismaService.group.findUnique({
      where: { group_id: chatGroupDto.ID },
    });

    if (!group) throw new BadRequestException('Group not found');

    const { data } = await this.getData(group.group_id, 'group');
    const groupNeeded = data.slice(
      paginationData.offset,
      paginationData.offset + paginationData.limit,
    );

    const groupNums = groupNeeded.map((group) => Number(group[0]));

    const groups = await this.prismaService.group.findMany({
      where: {
        group_id: {
          in: groupNums,
        },
      },
      include: {
        group_tag: true,
        group_user: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });
    return groups;
  }

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

  async getGeneralGroupRecommendations(
    paginationData: PaginationDto,
    userId: number,
  ): Promise<group[]> {
    const { data } = await this.getData(userId, 'general-group');
    const groupNeeded = data.slice(
      paginationData.offset,
      paginationData.offset + paginationData.limit,
    );

    const groupNums = groupNeeded.map((group) => Number(group[0]));

    const groups = await this.prismaService.group.findMany({
      where: {
        group_id: {
          in: groupNums,
        },
      },
      include: {
        group_tag: true,
        group_user: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });
    return groups;
  }

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
