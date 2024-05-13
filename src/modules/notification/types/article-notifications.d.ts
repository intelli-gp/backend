import { Prisma } from '@prisma/client';
import { SerializedArticleComment } from 'src/modules/articles/serialized-types/article-comment.serializer';
import { SerializedArticleLike } from 'src/modules/articles/serialized-types/article-like.serializer';
import { NotificationType } from '../enums/notification-primary-types.enum';
import { ArticleNotificationType } from '../enums/article-notifications.enum';
import { SerializedArticle } from 'src/modules/articles/serialized-types/article.serialized';
export type ArticleNotificationArgs =
    | {
          type: ArticleNotificationType<'LIKE'>;
          like: Prisma.article_likeWhereInput;
      }
    | {
          type: ArticleNotificationType<'COMMENT'>;
          comment: Prisma.article_commentWhereInput;
      }
    | {
          type: ArticleNotificationType<'CREATE'>;
          article: Prisma.articleWhereInput;
      };

export type ArticleLikeNotification = {
    eventName: NotificationType<'ARTICLE'>;
    type: ArticleNotificationType<'LIKE'>;
    message: SerializedArticleLike;
};

export type ArticleCommentNotification = {
    eventName: NotificationType<'ARTICLE'>;
    type: ArticleNotificationType<'COMMENT'>;
    message: SerializedArticleComment;
};

export type ArticleCreateNotification = {
    eventName: NotificationType<'ARTICLE'>;
    type: ArticleNotificationType<'CREATE'>;
    message: SerializedArticle;
};

export type ArticleNotification =
    | ArticleLikeNotification
    | ArticleCommentNotification
    | ArticleCreateNotification;

export default ArticleNotification;
