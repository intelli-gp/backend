import {
  Prisma,
  article_comment,
  article_like,
  follows,
  user,
} from '@prisma/client';
import { SerializedArticleComment } from 'src/modules/articles/serialized-types/article-comment.serializer';
import { SerializedArticleLike } from 'src/modules/articles/serialized-types/article-like.serializer';
import { PaginationDto } from 'src/common/dto';
import {
  NOTIFICATION_SUB_TYPES,
  NOTIFICATION_TYPES,
  NotificationSubtype,
  NotificationType,
} from '../enums/notification-primary-types.enum';
import { Logger } from '@nestjs/common';
import { SerializedUser } from 'src/modules/users/serialized-types/serialized-user';

const notificationsSerializerLogger = new Logger('NotificationsSerializer');

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

    const articlesNotifications =
      userArticles?.map((article) => {
        const serializedArticleComments =
          (article.article_comments as article_comment[])?.map((comment) => {
            notificationsSerializerLogger.debug(comment);
            return new SerializedUserNotification<
              article_comment,
              SerializedArticleComment,
              NotificationType<'ARTICLE'>
            >(
              {
                CreatedAt: new Date(comment?.created_at),
                PrimaryType: NOTIFICATION_TYPES.ARTICLE,
                SubType:
                  NOTIFICATION_SUB_TYPES[NOTIFICATION_TYPES.ARTICLE].COMMENT,
                Content: comment,
              },
              SerializedArticleComment,
            );
          }) || [];

        const serializedArticleLikes =
          (article.article_likes as article_like[])?.map((like) => {
            notificationsSerializerLogger.debug(like);
            return new SerializedUserNotification<
              article_like,
              SerializedArticleLike,
              NotificationType<'ARTICLE'>
            >(
              {
                CreatedAt: new Date(like?.liked_at),
                PrimaryType: NOTIFICATION_TYPES.ARTICLE,
                SubType:
                  NOTIFICATION_SUB_TYPES[NOTIFICATION_TYPES.ARTICLE].LIKE,
                Content: like,
              },
              SerializedArticleLike,
            );
          }) || [];

        // merge them into an array
        return [...serializedArticleComments, ...serializedArticleLikes];
      }) || [];

    const followsNotifications =
      (partial?.follows as Prisma.followsWhereInput[])?.map((follow) => {
        return new SerializedUserNotification<
          user,
          SerializedUser,
          NotificationType<'FOLLOW'>
        >(
          {
            CreatedAt: new Date(follow?.created_at as Date),
            PrimaryType: NOTIFICATION_TYPES.FOLLOW,
            SubType: NOTIFICATION_SUB_TYPES[NOTIFICATION_TYPES.FOLLOW].FOLLOW,
            Content: follow?.follower as user,
          },
          SerializedUser,
        );
      }) || [];

    const combinedNotfications = [
      ...articlesNotifications,
      ...followsNotifications,
    ];

    const combinedSortedNotifications = combinedNotfications
      ?.flat()
      ?.sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      })
      ?.slice(paginationData.offset, paginationData.limit);

    return combinedSortedNotifications;
  }
}
