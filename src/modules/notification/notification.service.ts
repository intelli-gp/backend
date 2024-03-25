import { Injectable, Logger } from '@nestjs/common';
import { EventsService } from './event.service';
import { SerializedMessage } from '../chat-groups/serialized-types/messages.serializer';
import { PrismaService } from '../prisma/prisma.service';
import { group_user } from '@prisma/client';

@Injectable()
export class NotificationService {
  private readonly NotificationServiceLogger = new Logger(
    NotificationService.name,
  );
  constructor(
    private readonly eventsService: EventsService,
    private readonly prismaService: PrismaService,
  ) {}

  async markMessageNotificationAsViewed(userId: number, messageId: number) {
    await this.prismaService.message_notification.update({
      where: {
        message_id_user_id: {
          message_id: messageId,
          user_id: userId,
        },
      },
      data: {
        isViewed: true,
      },
    });
  }

  async emitChatNotification(
    eligibleUsersForNotification: group_user[],
    data: SerializedMessage,
  ) {
    await this.prismaService.message_notification.createMany({
      data: eligibleUsersForNotification.map((user) => ({
        user_id: user.user_id,
        message_id: data.MessageID,
      })),
    });
    await this.eventsService.emit(eligibleUsersForNotification, {
      eventName: 'chat-group-message',
      message: data,
    });
  }
}
