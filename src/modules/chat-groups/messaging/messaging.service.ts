import { Injectable, Logger } from '@nestjs/common';
import { Prisma, group_user } from '@prisma/client';
import { NotificationService } from 'src/modules/notification/notification.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { SerializedMessage } from '../serialized-types/messages.serializer';

@Injectable()
export class MessagingService {
  private messagingLogger = new Logger('MessagingService');
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationsService: NotificationService,
  ) {}

  async getMessages(groupId: number) {
    return await this.prismaService.message.findMany({
      where: {
        group_id: groupId,
      },
      orderBy: {
        created_at: 'asc',
      },
      include: {
        user: true,
      },
    });
  }
  async createMessage(groupId: number, userId: number, messageContent: string) {
    const newMessage = await this.prismaService.message.create({
      data: {
        content: messageContent,
        group_id: groupId,
        user_id: userId,
      },
      include: {
        user: true,
      },
    });

    this.notificationsService.emitChatNotification(
      new SerializedMessage(newMessage as unknown as Prisma.messageWhereInput),
    );

    return newMessage;
  }

  async deleteMessage(messageId: number, userId: number) {
    //  let only message owner or group owner delete the message

    await this.prismaService.message.updateMany({
      where: {
        OR: [
          {
            message_id: messageId,
            user_id: userId,
          },
          {
            message_id: messageId,
            group: {
              created_by: userId,
            },
          },
        ],
      },
      data: { deleted: true },
    });

    const deletedMessageData = await this.prismaService.message.findUnique({
      where: {
        message_id: messageId,
      },
    });

    this.messagingLogger.debug({ deletedMessageData });

    return {
      messagesAfterDeletion: await this.getMessages(
        deletedMessageData.group_id,
      ),
      groupId: deletedMessageData.group_id,
    };
  }

  async editMessage(messageId: number, userId: number, newContent: string) {
    // let only the message owner edit the message
    const updatedMessage = await this.prismaService.message.update({
      where: {
        message_id: messageId,
        user_id: userId,
      },
      include: {
        user: true,
      },
      data: {
        content: newContent,
      },
    });

    return {
      messagesAfterEdit: await this.getMessages(updatedMessage.group_id),
      groupId: updatedMessage.group_id,
    };
  }
}
