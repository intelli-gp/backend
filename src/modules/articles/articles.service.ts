import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { TagsService } from '../tags/tags.service';
import { UpdateArticleDto } from './dto';
import { DeserializedArticle } from './serialized-types/article.deserializer';
import { PaginationDto } from 'src/common/dto';
import { NotificationService } from '../notification/notification.service';
import {
    NOTIFICATION_SUB_TYPES,
    NOTIFICATION_TYPES,
} from '../notification/enums/notification-primary-types.enum';
import { Prisma, follows } from '@prisma/client';
import { NotificationRecipient } from '../notification/types/notification-recepient';

@Injectable()
export class ArticlesService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly tagsService: TagsService,
        private readonly notificationsService: NotificationService,
    ) {}

    // TODO: Temporary
    async getAllArticles(paginationData: PaginationDto) {
        const articles = await this.prismaService.article.findMany({
            take: paginationData.limit,
            skip: paginationData.offset,
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

    async getArticle(articleId: number, userId?: number) {
        const article = await this.prismaService.article.findUnique({
            where: {
                article_id: articleId,
            },
            include: {
                article_tag: true,
                user: true,
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

        if (!article) throw new NotFoundException('Article not found');

        // add tags to user for recommendation (system only not visible to users)
        if (userId) this.addTagsToUser(articleId, userId);
        return article;
    }

    async getArticlesCreatedByUser(
        paginationData: PaginationDto,
        userId: number,
    ) {
        const articles = await this.prismaService.article.findMany({
            take: paginationData.limit,
            skip: paginationData.offset,
            where: {
                user_id: userId,
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

    async getBookmarkedArticles(paginationData: PaginationDto, userId: number) {
        const bookmarkedArticleCount =
            await this.prismaService.article_bookmark.count();
        const articles = await this.prismaService.article_bookmark.findMany({
            take: paginationData.limit,
            skip: paginationData.offset,
            where: {
                user_id: userId,
            },
            include: {
                article: {
                    include: {
                        article_tag: true,
                        user: true,
                        article_likes: {
                            include: {
                                user: true,
                            },
                        },
                        article_comments: true,
                    },
                },
            },
        });
        return {
            articles: articles.map((article) => article.article),
            totalCount: bookmarkedArticleCount,
        };
    }

    async createArticle(data: CreateArticleDto, userId: number) {
        const { title, coverImageUrl, tags, sections } = data;
        const sectionsPayload = sections.map(([value, content_type]) => ({
            value,
            content_type,
            created_at: new Date(),
        }));

        const addedArticle = await this.prismaService.article.create({
            data: {
                title,
                cover_image_url: coverImageUrl,
                user_id: userId,
                articles_content: {
                    createMany: {
                        data: sectionsPayload,
                    },
                },
            },
            include: {
                article_tag: true,
                user: {
                    include: {
                        followed_by: {
                            include: {
                                follower: true,
                            },
                        },
                    },
                },
                articles_content: true,
                // article_likes: {
                //   include: {
                //     user: true,
                //   },
                // },
                // article_comments: {
                //   include: {
                //     user: true,
                //     article_comment_likes: {
                //       include: {
                //         user: true,
                //       },
                //     },
                //   },
                // },
            },
        });
        await this.tagsService.addTagsForEntities(
            tags,
            'article',
            addedArticle.article_id,
        );
        // TODO: Remove this line after adding tags to the response
        addedArticle.article_tag = tags
            .map((tag) => ({
                tag_name: tag,
                article_id: addedArticle.article_id,
            }))
            .filter((tag, index, self) => {
                return (
                    index ===
                    self.findIndex(
                        (t) =>
                            t.tag_name === tag.tag_name &&
                            t.article_id === tag.article_id,
                    )
                );
            });

        const notificationRecipients = this.getArticleNotificationRecipients(
            null,
            addedArticle.user.followed_by,
        );

        // Remove the followed_by field from the user object to avoid circular serialization
        delete addedArticle.user.followed_by;

        await this.notificationsService.emitNotification(
            notificationRecipients,
            {
                EventName: NOTIFICATION_TYPES.ARTICLE,
                Type: NOTIFICATION_SUB_TYPES[NOTIFICATION_TYPES.ARTICLE].CREATE,
                Sender: {
                    ID: userId,
                    Username: addedArticle?.user?.username,
                    FullName: addedArticle?.user?.full_name,
                    ProfileImage: addedArticle?.user?.image,
                },
                Entity: {
                    ID: addedArticle.article_id,
                    Title: addedArticle.title,
                    EntityCreator: {
                        ID: addedArticle?.user?.user_id,
                        Username: addedArticle?.user?.username,
                        FullName: addedArticle?.user?.full_name,
                        ProfileImage: addedArticle?.user?.image,
                    },
                },
            },
        );

        return addedArticle;
    }

    /**
     *
     * @param articleId the id of the article you want to comment on
     * @param userId the id of the user commenting
     * @param commentContent The comment to be added in markdown
     */
    async createCommentOnArticle(
        articleId: number,
        userId: number,
        commentContent: string,
    ) {
        const articleComment = await this.prismaService.article_comment.create({
            data: {
                article_id: articleId,
                user_id: userId,
                md_content: commentContent,
            },
            include: {
                user: {
                    include: {
                        followed_by: {
                            include: {
                                follower: true,
                            },
                        },
                    },
                },
                article: {
                    include: {
                        user: {
                            include: {
                                followed_by: {
                                    include: {
                                        follower: true,
                                    },
                                },
                            },
                        },
                    },
                },
                // article_comment_likes: {
                //   include: {
                //     user: true,
                //   },
                // },
            },
        });

        let authorData = null;
        if (articleComment.article.user.user_id !== userId)
            authorData = {
                recipientId: articleComment.article.user.user_id,
                isMuted:
                    articleComment.article.user
                        .is_article_notifications_muted ||
                    articleComment.article.user.is_notifications_muted,
            };

        const notificationRecipients = this.getArticleNotificationRecipients(
            authorData,
            articleComment.article.user.followed_by,
            articleComment.user.followed_by,
        );

        await this.notificationsService.emitNotification(
            notificationRecipients,
            {
                EventName: NOTIFICATION_TYPES.ARTICLE,
                Type: NOTIFICATION_SUB_TYPES[NOTIFICATION_TYPES.ARTICLE]
                    .COMMENT,
                Sender: {
                    ID: userId,
                    Username: articleComment?.user?.username,
                    FullName: articleComment?.user?.full_name,
                    ProfileImage: articleComment?.user?.image,
                },
                Entity: {
                    ID: articleComment?.article_id,
                    Title: articleComment?.article?.title,
                    EntityCreator: {
                        ID: articleComment?.article?.user?.user_id,
                        Username: articleComment?.article?.user?.username,
                        FullName: articleComment?.article?.user?.full_name,
                        ProfileImage: articleComment?.article?.user?.image,
                    },
                },
            },
        );

        // remove the article_comment_likes from the response
        delete articleComment.article.user.followed_by;
        delete articleComment.user.followed_by;

        return articleComment;
    }

    async updateCommentOnArticle(
        commentId: number,
        userId: number,
        commentContent: string,
    ) {
        // Allow only the user who created the comment to update it
        const comment = await this.prismaService.article_comment.update({
            where: {
                comment_id: commentId,
                user_id: userId,
            },
            data: {
                md_content: commentContent,
            },
            include: {
                user: true,
                article_comment_likes: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (!comment)
            throw new NotFoundException('Comment not found or unauthorized');
        return comment;
    }

    async deleteCommentOnArticle(
        commentId: number,
        articleId: number,
        userId: number,
    ) {
        /**
         * Users allowed to delete a comment
         * 1. The user who created the comment
         * 2. The user who created the article
         */
        // Comments are not truly deleted but hidden for community moderation (toxicity check, etc..)
        // TODO: decide whether deleted comments are entirely hidden or just marked as deleted in UI
        await this.prismaService.article_comment.updateMany({
            where: {
                OR: [
                    {
                        comment_id: commentId,
                        user_id: userId,
                        article_id: articleId,
                    },
                    {
                        comment_id: commentId,
                        article: {
                            user_id: userId,
                        },
                    },
                ],
            },
            data: {
                deleted: true,
            },
        });
    }

    async toggleLikeArticle(articleId: number, userId: number) {
        const likeExists = await this.prismaService.article_like.findUnique({
            where: {
                article_id_user_id: {
                    article_id: articleId,
                    user_id: userId,
                },
            },
        });

        if (likeExists) {
            // TODO: decide whether to delete the like or just add an invisible flag
            // If invisible flag added then just use prisma upsert
            return await this.prismaService.article_like.delete({
                where: {
                    article_id_user_id: {
                        article_id: articleId,
                        user_id: userId,
                    },
                },
                include: {
                    user: true,
                },
            });
        } else {
            const articleLike = await this.prismaService.article_like.create({
                data: {
                    article_id: articleId,
                    user_id: userId,
                },
                include: {
                    article: {
                        include: {
                            user: {
                                include: {
                                    followed_by: {
                                        include: {
                                            follower: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    user: {
                        include: {
                            followed_by: {
                                include: {
                                    follower: true,
                                },
                            },
                        },
                    },
                },
            });

            let authorData = null;
            if (articleLike.article.user.user_id !== userId)
                authorData = {
                    recipientId: articleLike?.article?.user?.user_id,
                    isMuted:
                        articleLike?.article.user
                            ?.is_article_notifications_muted ||
                        articleLike?.article.user?.is_notifications_muted,
                };

            // no need to add a filter here bec a user shouldnt be able to follow himself
            const notificationRecipients =
                this.getArticleNotificationRecipients(
                    authorData,
                    articleLike.article.user.followed_by,
                    articleLike.user.followed_by,
                );

            await this.notificationsService.emitNotification(
                notificationRecipients,
                {
                    EventName: NOTIFICATION_TYPES.ARTICLE,
                    Type: NOTIFICATION_SUB_TYPES[NOTIFICATION_TYPES.ARTICLE]
                        .LIKE,
                    Sender: {
                        ID: userId,
                        Username: articleLike?.user?.username,
                        FullName: articleLike?.user?.full_name,
                        ProfileImage: articleLike?.user?.image,
                    },
                    Entity: {
                        ID: articleLike?.article_id,
                        Title: articleLike?.article?.title,
                        EntityCreator: {
                            ID: articleLike?.article?.user?.user_id,
                            Username: articleLike?.article?.user?.username,
                            FullName: articleLike?.article?.user?.full_name,
                            ProfileImage: articleLike?.article?.user?.image,
                        },
                    },
                },
            );

            // Remove the followed_by field from the user object to avoid circular serialization
            delete articleLike.article.user.followed_by;
            delete articleLike.user.followed_by;

            return articleLike;
        }
    }
    async toggleLikeArticleComment(commentId: number, userId: number) {
        // TODO: decide whether or not to delete the like or just add an invisible flag
        const likeExists =
            await this.prismaService.article_comment_like.findUnique({
                where: {
                    comment_id_user_id: {
                        comment_id: commentId,
                        user_id: userId,
                    },
                },
            });

        if (likeExists) {
            return await this.prismaService.article_comment_like.delete({
                where: {
                    comment_id_user_id: {
                        comment_id: commentId,
                        user_id: userId,
                    },
                },
                include: {
                    user: true,
                },
            });
        } else {
            const like = await this.prismaService.article_comment_like.create({
                data: {
                    comment_id: commentId,
                    user_id: userId,
                },
                include: {
                    user: true,
                },
            });
            return like;
        }
    }

    async toggleBookmarkArticle(articleId: number, userId: number) {
        const bookmarkExists =
            await this.prismaService.article_bookmark.findUnique({
                where: {
                    article_id_user_id: {
                        article_id: articleId,
                        user_id: userId,
                    },
                },
            });

        if (bookmarkExists) {
            return await this.prismaService.article_bookmark.delete({
                where: {
                    article_id_user_id: {
                        article_id: articleId,
                        user_id: userId,
                    },
                },
                include: {
                    user: true,
                },
            });
        } else {
            return await this.prismaService.article_bookmark.create({
                data: {
                    article_id: articleId,
                    user_id: userId,
                },
                include: {
                    user: true,
                },
            });
        }
    }
    async updateArticle(
        articleData: UpdateArticleDto,
        articleId: number,
        userId: number,
    ) {
        if (!articleData)
            throw new BadRequestException('No update data provided');

        const { addedTags, removedTags, ...restOfData } = articleData;
        const deserializedArticle = new DeserializedArticle(restOfData);

        const { articles_content, ...articleMainData } = deserializedArticle;

        const updatedArticle = await this.prismaService.$transaction(
            async (prisma) => {
                Logger.debug('Updating article');
                // Repopulate the sections of the articles with new data
                // TODO: Clean up
                if (articles_content) {
                    await prisma.articles_content.deleteMany({
                        where: {
                            article_id: articleId,
                        },
                    });

                    await prisma.articles_content.createMany({
                        data: articles_content.map(([value, content_type]) => ({
                            article_id: articleId,
                            value,
                            content_type,
                        })),
                    });
                }
                if (addedTags?.length || removedTags?.length) {
                    // TODO: Not included in the transaction
                    await this.tagsService.updateTagsForEntities(
                        addedTags,
                        removedTags,
                        'article',
                        articleId,
                    );
                }
                if (articleMainData) {
                    return await prisma.article.update({
                        where: {
                            article_id: articleId,
                            user_id: userId,
                        },
                        data: {
                            ...articleMainData,
                        },
                        include: {
                            article_tag: true,
                            user: true,
                            articles_content: true,
                        },
                    });
                } else {
                    return await prisma.article.findUnique({
                        where: {
                            article_id: articleId,
                        },
                        include: {
                            article_tag: true,
                            user: true,
                            articles_content: true,
                        },
                    });
                }
            },
        );
        return updatedArticle;
    }

    async deleteArticle(articleId: number, userId: number) {
        await this.prismaService.article.delete({
            where: {
                article_id: articleId,
                user_id: userId,
            },
        });
        return true;
    }

    private getArticleNotificationRecipients(
        authorData: NotificationRecipient,
        authorFollowers: Prisma.followsWhereInput[],
        notificationSenderFollowers?: follows[],
    ): NotificationRecipient[] {
        const notificationRecipients: NotificationRecipient[] = [];
        if (authorData) {
            notificationRecipients.push({
                recipientId: authorData.recipientId,
                isMuted: authorData.isMuted,
            });
        }

        if (!notificationSenderFollowers) {
            const authorFollowerIds = authorFollowers.map((f) => {
                return {
                    recipientId: f.follower_id as number,
                    isMuted:
                        (f.follower?.is_notifications_muted as boolean) ||
                        (f.follower
                            ?.is_article_notifications_muted as boolean) ||
                        false,
                };
            });
            notificationRecipients.push(...authorFollowerIds);
        }

        // if the notification sender followers are provided
        const commonFollowers = authorFollowers
            ?.filter((follower) =>
                notificationSenderFollowers?.some(
                    (senderFollower) =>
                        senderFollower.follower_id === follower.follower_id,
                ),
            )
            ?.map((f) => {
                return {
                    recipientId: f.follower_id as number,
                    isMuted:
                        (f.follower?.is_notifications_muted as boolean) ||
                        (f.follower
                            ?.is_article_notifications_muted as boolean) ||
                        false,
                };
            });

        notificationRecipients.push(...commonFollowers);

        return notificationRecipients;
    }

    private async addTagsToUser(articleId: number, userId: number) {
        const tagsAdded = await this.prismaService
            .$transaction(async (prisma) => {
                const articleTags = await prisma.article.findUnique({
                    where: {
                        article_id: articleId,
                    },
                    select: {
                        article_tag: true,
                    },
                });
                const tags = articleTags.article_tag.map((tag) => {
                    return tag.tag_name;
                });

                await this.tagsService.addTagsToUserSystem(
                    tags,
                    userId,
                    prisma,
                );
                return true;
            })
            .catch((e) => {
                console.log(e.message);
                return false;
            });
        return tagsAdded;
    }
}
