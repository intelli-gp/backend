import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class MessagingService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMessages(groupId: number) {
    return await this.prismaService.message.findMany({
      where: {
        group_id: groupId,
      },
      include: {
        user: true,
      },
    });
  }
  async createMessage(groupId: number, userId: number, messageContent: string) {
    return await this.prismaService.message.create({
      data: {
        content: messageContent,
        group_id: groupId,
        user_id: userId,
      },
      include: {
        user: true,
      },
    });
  }

  async deleteMessage(messageId: number, userId: number) {
    //  let only message owner or group owner delete the message

    const deletedMessage = await this.prismaService.message.update({
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
      } as Prisma.messageWhereUniqueInput,
      data: { deleted: true },
    });

    return {
      messagesAfterDeletion: await this.getMessages(deletedMessage.group_id),
      groupId: deletedMessage.group_id,
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
