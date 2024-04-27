import { Prisma, article_comment_like } from '@prisma/client';
import { SerializedArticleComment } from 'src/modules/articles/serialized-types/article-comment.serializer';
import { SerializedArticleLike } from 'src/modules/articles/serialized-types/article-like.serializer';
import { ArticleNotificationTypesEnum } from '../enums/article-notifications.enum';
export type ArticleNotificationArgs =
  | {
      type: ArticleNotificationTypesEnum.LIKE;
      like: Prisma.article_likeWhereInput;
    }
  | {
      type: ArticleNotificationTypesEnum.COMMENT;
      comment: Prisma.article_commentWhereInput;
    };

export type ArticleLikeNotification = {
  eventName: 'article-notification';
  type: ArticleNotificationTypesEnum.LIKE;
  message: SerializedArticleLike;
};

export type ArticleCommentNotification = {
  eventName: 'article-notification';
  type: ArticleNotificationTypesEnum.COMMENT;
  message: SerializedArticleComment;
};

export type ArticleCommentReplyNotification = {
  eventName: 'article-notification';
  type: ArticleNotificationTypesEnum.COMMENT_REPLY;
  message: article_comment_like;
};

export type ArticleNotification =
  | ArticleLikeNotification
  | ArticleCommentNotification
  | ArticleCommentReplyNotification;

export default ArticleNotification;
