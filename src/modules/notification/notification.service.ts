import { Injectable, Logger } from '@nestjs/common';
import { EventsService } from './event.service';
import { SerializedMessage } from '../chat-groups/serialized-types/messages/messages.serializer';
import { PrismaService } from '../prisma/prisma.service';
import { group_user } from '@prisma/client';
import { ChatGroupMessagesNotification } from './types/messages-notifications';

@Injectable()
export class NotificationService {
  private readonly NotificationServiceLogger = new Logger(
    NotificationService.name,
  );
  constructor(
    private readonly eventsService: EventsService,
    private readonly prismaService: PrismaService,
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
        this.NotificationServiceLogger.debug({
          GroupMessages: groupUser?.group?.message,
        });
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

  async emitChatNotification(
    eligibleUsersForNotification: group_user[],
    data: SerializedMessage,
  ) {
    await this.eventsService.emit(eligibleUsersForNotification, {
      eventName: 'chat-group-message',
      message: data,
    });
  }
}
