import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationDto } from '../../common/dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { DeleteArticleDto } from '../articles/dto';
import { GetSingleUserDto } from '../users/dto/get-user.dto';
import { article, group, user } from '.prisma/client';
import { GetSingleChatGroupDto } from '../chat-groups/dto';

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

        const articleNums = await this.getData(
            idDto.articleId,
            'article',
            paginationData,
        );

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

        return {
            articles: this.orderArticles(articles, articleNums),
            totalEntityCount: articleNums.length,
        };
    }

    async getSpecificGroupRecommendations(
        paginationData: PaginationDto,
        chatGroupDto: GetSingleChatGroupDto,
    ) {
        const group = await this.prismaService.group.findUnique({
            where: { group_id: chatGroupDto.ID },
        });

        if (!group) throw new BadRequestException('Group not found');

        const groupNums = await this.getData(
            group.group_id,
            'group',
            paginationData,
        );

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
        return {
            groups: this.orderGroups(groups, groupNums),
            totalEntityCount: groupNums.length,
        };
    }

    async getSpecificUserRecommendations(
        paginationData: PaginationDto,
        usernameDto: GetSingleUserDto,
    ) {
        const user = await this.prismaService.user.findUnique({
            where: { username: usernameDto.Username },
        });

        if (!user) throw new BadRequestException('User not found');

        const userNums = await this.getData(
            user.user_id,
            'user',
            paginationData,
        );

        const users = await this.prismaService.user.findMany({
            where: {
                user_id: {
                    in: userNums,
                },
            },
        });
        return {
            users: this.orderUsers(users, userNums),
            totalEntityCount: userNums.length,
        };
    }

    async getGeneralArticleRecommendations(
        paginationData: PaginationDto,
        userId: number,
    ) {
        const articleNums = await this.getData(
            userId,
            'general-article',
            paginationData,
        );

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

        return {
            articles: this.orderArticles(articles, articleNums),
            totalEntityCount: articleNums.length,
        };
    }

    async getGeneralGroupRecommendations(
        paginationData: PaginationDto,
        userId: number,
    ) {
        const groupNums = await this.getData(
            userId,
            'general-group',
            paginationData,
        );

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
        return {
            groups: this.orderGroups(groups, groupNums),
            totalEntityCount: groupNums.length,
        };
    }

    async getGeneralUserRecommendations(
        paginationData: PaginationDto,
        userId: number,
    ) {
        const userNums = await this.getData(
            userId,
            'general-user',
            paginationData,
        );

        const users = await this.prismaService.user.findMany({
            where: {
                user_id: {
                    in: userNums,
                },
            },
        });

        return {
            users: this.orderUsers(users, userNums),
            totalEntityCount: userNums.length,
        };
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
        paginationData?: PaginationDto,
    ): Promise<number[]> {
        const urlPath = `/${type}-recommendations/${id}`;

        const { data } =
            await this.recommenderHttpService.axiosRef.get(urlPath);

        const dataNeeded = data.slice(
            paginationData.offset,
            paginationData.offset + paginationData.limit,
        );

        const dataNums = dataNeeded.map((data) => Number(data[0]));
        return dataNums;
    }
    private orderArticles(articles: article[], indexes: number[]) {
        return indexes.map((articleNum) => {
            return articles.find(
                (article) => article.article_id === articleNum,
            );
        });
    }

    private orderUsers(users: user[], indexes: number[]) {
        return indexes.map((userNum) => {
            return users.find((user) => user.user_id === userNum);
        });
    }

    private orderGroups(groups: group[], indexes: number[]) {
        return indexes.map((groupNum) => {
            return groups.find((group) => group.group_id === groupNum);
        });
    }
}
