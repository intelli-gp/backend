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
import { ArticleNotificationTypesEnum } from '../notification/enums/article-notifications.enum';

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

  async getArticle(articleId: number) {
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
        user: true,
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
              t.tag_name === tag.tag_name && t.article_id === tag.article_id,
          )
        );
      });
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
        user: true,
        article: {
          include: {
            user: true,
          },
        },
        article_comment_likes: {
          include: {
            user: true,
          },
        },
      },
    });

    const { article_comment_likes, ...notificationComment } = articleComment;

    await this.notificationsService.emitArticleNotification(
      articleComment.article.user,
      {
        type: ArticleNotificationTypesEnum.COMMENT,
        comment: notificationComment,
      },
    );
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
          { comment_id: commentId, user_id: userId, article_id: articleId },
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
              user: true,
            },
          },
          user: true,
        },
      });

      await this.notificationsService.emitArticleNotification(
        articleLike.article.user,
        {
          type: ArticleNotificationTypesEnum.LIKE,
          like: articleLike,
        },
      );

      return articleLike;
    }
  }
  async toggleLikeArticleComment(commentId: number, userId: number) {
    // TODO: decide whether or not to delete the like or just add an invisible flag
    const likeExists = await this.prismaService.article_comment_like.findUnique(
      {
        where: {
          comment_id_user_id: {
            comment_id: commentId,
            user_id: userId,
          },
        },
      },
    );

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
      return await this.prismaService.article_comment_like.create({
        data: {
          comment_id: commentId,
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
    if (!articleData) throw new BadRequestException('No update data provided');

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
}
