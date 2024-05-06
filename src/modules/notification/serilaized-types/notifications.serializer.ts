import { Prisma, article_comment, article_like } from '@prisma/client';
import { SerializedArticleComment } from 'src/modules/articles/serialized-types/article-comment.serializer';
import { SerializedArticleLike } from 'src/modules/articles/serialized-types/article-like.serializer';
import { PaginationDto } from 'src/common/dto';
import {
  NOTIFICATION_SUB_TYPES,
  NOTIFICATION_TYPES,
  NotificationSubtype,
  NotificationType,
} from '../enums/notification-primary-types.enum';

export interface NotificationSendType<
  T extends NotificationType<void>,
  NonSerializedEntity,
> {
  CreatedAt: Date;
  PrimaryType: T;
  SubType: NotificationSubtype<T>;
  Content: NonSerializedEntity;
}

export class SerializedUserNotification<
  NonSerializedEntity,
  SerializedEntity,
  NotificationPrimaryType extends
    NotificationType<void> = NotificationType<void>,
> {
  createdAt: Date;
  eventName: NotificationPrimaryType;
  type: NotificationSubtype<NotificationPrimaryType>;
  message: SerializedEntity;

  constructor(
    partial: NotificationSendType<NotificationPrimaryType, NonSerializedEntity>,
    EntitySerializer: new (partial: NonSerializedEntity) => SerializedEntity,
  ) {
    this.createdAt = partial?.CreatedAt;
    this.eventName = partial?.PrimaryType;
    this.type = partial?.SubType;
    this.message = new EntitySerializer(partial?.Content);
  }
}

export class SerializedUserNotifications {
  constructor(
    partial: Partial<Omit<Prisma.userWhereInput, 'AND' | 'OR' | 'NOT'>>,
    paginationData: PaginationDto,
  ) {
    const userArticles = partial?.article as Prisma.articleWhereInput[];

    const articlesNotifications = userArticles?.map((article) => {
      const serializedArticleComments = (
        article.article_comments as article_comment[]
      )?.map((comment) => {
        return new SerializedUserNotification<
          article_comment,
          SerializedArticleComment,
          NotificationType<'ARTICLE'>
        >(
          {
            CreatedAt: new Date(comment?.created_at),
            PrimaryType: NOTIFICATION_TYPES.ARTICLE,
            SubType: NOTIFICATION_SUB_TYPES[NOTIFICATION_TYPES.ARTICLE].COMMENT,
            Content: comment,
          },
          SerializedArticleComment,
        );
      });

      const serializedArticleLikes = (
        article.article_likes as article_like[]
      )?.map((like) => {
        return new SerializedUserNotification<
          article_like,
          SerializedArticleLike,
          NotificationType<'ARTICLE'>
        >(
          {
            CreatedAt: new Date(like?.liked_at),
            PrimaryType: NOTIFICATION_TYPES.ARTICLE,
            SubType: NOTIFICATION_SUB_TYPES[NOTIFICATION_TYPES.ARTICLE].LIKE,
            Content: like,
          },
          SerializedArticleLike,
        );
      });

      // merge them into an array
      return [...serializedArticleComments, ...serializedArticleLikes];
    });

    const combinedSortedNotifications = articlesNotifications
      ?.flat()
      .slice(paginationData.offset, paginationData.limit)
      .sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      });

    return combinedSortedNotifications;
  }
}
