import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PaginationDto } from '../../common/dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { DeleteArticleDto } from '../articles/dto';
import { GetSingleUserDto } from '../users/dto/get-user.dto';
import { article, group, user } from '.prisma/client';
import { GetSingleChatGroupDto } from '../chat-groups/dto';
import { follows, group_user } from '@prisma/client';

@Injectable()
export class RecommenderSystemService {
    private readonly logger = new Logger(RecommenderSystemService.name);
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

        // Get the users that the current user follows to filter them out
        const FollowedUsers = await this.prismaService.follows.findMany({
            where: {
                follower_id: user.user_id,
            },
        });

        this.logger.debug('users recommended', users);
        this.logger.debug('followed users', FollowedUsers);

        const filteredUsers = this.filterFollowedUsers(users, FollowedUsers);
        this.logger.debug('filtered users', filteredUsers);

        const orderedUsers = this.orderUsers(filteredUsers, userNums);
        this.logger.debug('ordered users', orderedUsers);
        return {
            users: orderedUsers,
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

        // Get the groups that the current user is a member of to filter them out

        const userGroups = await this.prismaService.group_user.findMany({
            where: {
                user_id: userId,
            },
        });

        const filteredGroups = this.filterJoinedGroups(groups, userGroups);

        return {
            groups: this.orderGroups(filteredGroups, groupNums),
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

        // Get the users that the current user follows to filter them out

        const FollowedUsers = await this.prismaService.follows.findMany({
            where: {
                follower_id: userId,
            },
        });

        const filteredUsers = this.filterFollowedUsers(users, FollowedUsers);

        return {
            users: this.orderUsers(filteredUsers as user[], userNums),
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

    private filterFollowedUsers(
        recommendedUsers: user[],
        FollowedUsers: follows[],
    ) {
        // Filter out the users that I already follow from the recommendations
        const followedUserIds = FollowedUsers.map(
            (follow) => follow.followed_id,
        );
        return recommendedUsers.filter(
            (user) => !followedUserIds.includes(user.user_id as number),
        );
    }

    private filterJoinedGroups(
        recommendedGroups: group[],
        userGroups: group_user[],
    ) {
        // Filter out the groups that I am already a member of from the recommendations
        const userGroupIds = userGroups.map((group) => group.group_id);
        return recommendedGroups.filter(
            (group) => !userGroupIds.includes(group.group_id as number),
        );
    }

    private orderArticles(articles: article[], indexes: number[]) {
        const articleMap = new Map(
            articles.map((article) => [article.article_id, article]),
        );

        return indexes
            .map((index) => articleMap.get(index))
            .filter((article) => !!article);
    }

    private orderUsers(users: user[], indexes: number[]) {
        const userMap = new Map(users.map((user) => [user.user_id, user]));

        return indexes
            .map((index) => userMap.get(index))
            .filter((user) => !!user);
    }

    private orderGroups(groups: group[], indexes: number[]) {
        const groupMap = new Map(
            groups.map((group) => [group.group_id, group]),
        );

        return indexes
            .map((index) => groupMap.get(index))
            .filter((group) => !!group);
    }
}
