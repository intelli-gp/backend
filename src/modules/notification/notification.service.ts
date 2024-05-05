import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { EventsService } from './event.service';
import { SerializedMessage } from '../chat-groups/serialized-types/messages/messages.serializer';
import { PrismaService } from '../prisma/prisma.service';
import { group_user, user } from '@prisma/client';
import { ChatGroupMessagesNotification } from './types/messages-notifications';
import { SseEvents } from './types/events';
import { ArticleNotificationArgs } from './types/article-notifications';
import { SerializedArticleComment } from '../articles/serialized-types/article-comment.serializer';
import { SerializedArticleLike } from '../articles/serialized-types/article-like.serializer';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  NOTIFICATION_SUB_TYPES,
  NOTIFICATION_TYPES,
} from './enums/notification-primary-types.enum';

import {
  ARTICLE_NOTIFICATION_TYPES,
  ArticleNotificationType,
} from './enums/article-notifications.enum';

import { ViewNotificationDto } from './dto/view-notification.dto';

@Injectable()
export class NotificationService {
  private readonly NotificationServiceLogger = new Logger(
    NotificationService.name,
  );
  constructor(
    private readonly eventsService: EventsService,
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {}

  async getGroupUserMessageNotifications(
    userId: number,
  ): Promise<ChatGroupMessagesNotification[]> {
    this.NotificationServiceLogger.log(
      `Getting message notifications for user ${userId}`,
    );
    /**
     * Steps:
     * 1. Get all groups the user is a member of by getting all group users records for certain user
     * 2. Get all messages in the group that the user has not read yet
     * by checking the last read of the group user and comparing it to the message created At
     * 3. Return the last message for each group and the number of unread messages
     */

    const groupUsers = await this.prismaService.group_user.findMany({
      where: {
        user_id: userId,
        joining_status: true,
      },
      include: {
        group: {
          include: {
            message: {
              orderBy: {
                message_id: 'asc',
              },
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    const messagesNotifications = groupUsers.map((groupUser) => {
      const readTimeThreshold = groupUser.last_read;
      if (!readTimeThreshold) {
        return;
      }
      /**
       * Get all messages in the group that the user has not read yet
       * by checking the last read of the group user and comparing it to the message created At
       * Note: These messages cannot be created by the user himself
       */
      const unreadMessages = groupUser?.group?.message.filter(
        (message) =>
          message.created_at > readTimeThreshold && message.user_id !== userId,
      );

      this.NotificationServiceLogger.debug({
        unreadMessagesCount: unreadMessages.length,
      });

      // Return the last message for each group and the number of unread messages

      const lastMessage =
        groupUser?.group?.message[groupUser.group.message.length - 1];

      const unreadMessagesCount = unreadMessages.length;

      if (unreadMessagesCount > 0) {
        // this.NotificationServiceLogger.debug({
        //   GroupMessages: groupUser?.group?.message,
        // });
        this.NotificationServiceLogger.debug({ unreadMessages });
      }
      // A precautionary measure to avoid circular JSON
      delete groupUser.group.message;

      return {
        group: groupUser.group,
        lastMessage,
        unreadMessagesCount,
      };
    });

    // this.NotificationServiceLogger.debug({ messagesNotifications });

    return messagesNotifications;
  }

  /**
   *
   * @param userId id of the user
   * @returns all notifications for a user except messages
   */
  async getUserNotifications(userId: number) {
    this.NotificationServiceLogger.log(
      `Getting notifications for user ${userId}`,
    );

    const cachedUser = await this.cacheService.get(
      `user-${userId}-notifications`,
    );

    if (cachedUser) {
      return cachedUser;
    }

    const userWithNotifications = await this.prismaService.user.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        article: {
          select: {
            article_id: true,
            article_comments: {
              select: {
                article_id: true,
                created_at: true,
                comment_id: true,
                user: {
                  select: {
                    image: true,
                    user_id: true,
                    username: true,
                    full_name: true,
                  },
                },
              },
            },
            article_likes: {
              select: {
                article_id: true,
                liked_at: true,
                user: {
                  select: {
                    image: true,
                    user_id: true,
                    username: true,
                    full_name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    await this.cacheService.set(
      `user-${userId}-notifications`,
      userWithNotifications,
      3600,
    );

    return userWithNotifications;
  }

  async viewAllUserNotifications(userId: number) {
    this.NotificationServiceLogger.log(
      `Viewing notifications for user ${userId}`,
    );

    throw new Error('Method not implemented');
  }

  async viewSingleUserNotification(
    userId: number,
    notificationData: ViewNotificationDto,
  ) {
    this.NotificationServiceLogger.log(
      `Viewing notification for user ${userId}of type ${notificationData.PrimaryType}, subType ${notificationData.SubType} with id ${notificationData.ID}`,
    );

    switch (notificationData.PrimaryType) {
      case NOTIFICATION_TYPES.ARTICLE: {
        await this.#viewUserSingleArticleNotification(
          notificationData.ID,
          notificationData.SubType as ArticleNotificationType<void>,
          notificationData.NotificationSenderID,
        );
        break;
      }
      default: {
        this.NotificationServiceLogger.error('Invalid notification type');
        throw new BadRequestException('Invalid notification type');
      }
    }
  }

  async #viewUserSingleArticleNotification(
    notificationId: number,
    type: ArticleNotificationType<void>,
    notificationSenderId?: number,
  ) {
    this.NotificationServiceLogger.log(
      `Viewing article notification of type ${type} with id ${notificationId}`,
    );

    switch (type) {
      case ARTICLE_NOTIFICATION_TYPES.COMMENT:
        await this.prismaService.article_comment.update({
          where: {
            comment_id: notificationId as number,
          },
          data: {
            isNotificationViewed: true,
          },
        });
        break;
      case ARTICLE_NOTIFICATION_TYPES.LIKE: {
        this.NotificationServiceLogger.debug({
          notificationId,
          notificationSenderId,
        });
        await this.prismaService.article_like.update({
          where: {
            article_id_user_id: {
              article_id: notificationId,
              user_id: notificationSenderId,
            },
          },
          data: {
            isNotificationViewed: true,
          },
        });
        break;
      }
      default:
        this.NotificationServiceLogger.error(
          'Invalid article notification sub-type',
        );
        throw new BadRequestException('Invalid article notification sub-type');
    }
  }

  async emitArticleNotification(
    articleAuthor: user,
    args: ArticleNotificationArgs,
  ) {
    switch (args.type) {
      case NOTIFICATION_SUB_TYPES[NOTIFICATION_TYPES.ARTICLE].LIKE:
        const likeNotification: SseEvents = {
          eventName: NOTIFICATION_TYPES.ARTICLE,
          type: args.type,
          message: new SerializedArticleLike(args.like),
        };

        await this.eventsService.emit(
          [articleAuthor as user],
          likeNotification,
        );
        break;
      case NOTIFICATION_SUB_TYPES[NOTIFICATION_TYPES.ARTICLE].COMMENT:
        const commentNotification: SseEvents = {
          eventName: NOTIFICATION_TYPES.ARTICLE,
          type: args.type,
          message: new SerializedArticleComment(args.comment),
        };
        await this.eventsService.emit(
          [articleAuthor as user],
          commentNotification,
        );
        break;
      default:
        this.NotificationServiceLogger.error('Invalid notification type');
        break;
    }
  }

  async emitChatNotification(
    eligibleUsersForNotification: group_user[],
    data: SerializedMessage,
  ) {
    await this.eventsService.emit(eligibleUsersForNotification, {
      eventName: NOTIFICATION_TYPES.MESSAGE,
      message: data,
    });
  }
}
