import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma, group_user, message } from '@prisma/client';
import { NotificationService } from 'src/modules/notification/notification.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { SerializedMessage } from '../serialized-types/messages/messages.serializer';
import { MessageReadReceipt } from './types/message-read';

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
        message_id: 'asc',
      },
      include: {
        user: true,
        replied_to_message: {
          include: {
            user: {
              select: {
                full_name: true,
                username: true,
              },
            },
          },
        },
        message_reactions: {
          include: {
            user: {
              select: {
                user_id: true,
                full_name: true,
                image: true,
                username: true,
              },
            },
          },
        },
      },
    });
  }

  async getMessage(messageId: number) {
    return await this.prismaService.message.findUnique({
      where: {
        message_id: messageId,
      },
      include: {
        user: true,
        replied_to_message: true,
        message_reactions: {
          include: {
            user: {
              select: {
                user_id: true,
                full_name: true,
                image: true,
                username: true,
              },
            },
          },
        },
      },
    });
  }

  async getMessageReadReceipts(messageId: number) {
    // get the message read status dynamically without the need of a table for it
    const messageWithGroupAndGroupUsers =
      await this.prismaService.message.findUnique({
        where: {
          message_id: messageId,
        },
        include: {
          group: {
            include: {
              group_user: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });

    const messageOwner = messageWithGroupAndGroupUsers.user_id;
    const messageCreationDate = messageWithGroupAndGroupUsers.created_at;
    const groupUsers = messageWithGroupAndGroupUsers.group.group_user;
    const readReceipts: MessageReadReceipt[] = groupUsers
      .filter((groupUser) => {
        return (
          groupUser.last_read >= messageCreationDate &&
          groupUser.user_id !== messageOwner
        );
      })
      .map((groupUser: Prisma.group_userWhereInput) => {
        return {
          message_id: messageId,
          user_id: groupUser?.user_id,
          read_at: groupUser?.last_read,
          user: groupUser?.user,
        } as MessageReadReceipt;
      });
    this.messagingLogger.debug({ readReceipts });
    return readReceipts;
  }

  async createMessage(
    groupId: number,
    userId: number,
    messageContent: string,
    repliedToMessageId?: number,
  ) {
    const newMessage = await this.prismaService.message.create({
      data: {
        content: messageContent,
        group_id: groupId,
        user_id: userId,
        reply_to: repliedToMessageId,
      },

      include: {
        user: true,
        replied_to_message: {
          include: {
            user: {
              select: {
                full_name: true,
                username: true,
              },
            },
          },
        },
        group: {
          include: {
            group_user: true,
          },
        },
      },
    });

    const currentDate = new Date();

    // updating the last read status of group users
    await this.prismaService.group_user.updateMany({
      where: {
        inRoom: true,
      },
      data: {
        last_read: currentDate,
      },
    });

    const eligibleUsersForNotification = newMessage.group.group_user.filter(
      (groupUser: group_user) => {
        return (
          groupUser.user_id !== userId &&
          !groupUser.inRoom &&
          groupUser.joining_status
        );
      },
    );

    this.notificationsService.emitChatNotification(
      eligibleUsersForNotification,
      new SerializedMessage(newMessage as unknown as Prisma.messageWhereInput, {
        isNotification: true,
      }),
    );

    return newMessage;
  }

  /**
   *
   * @param messageId id of the message user wants to react to
   * @param userId the user who wants to react to the message
   * @param reaction reaction to the message (reaction is upserted, if it exists it is updated, if not it is created)
   * @returns
   */
  async reactToMessage(messageId: number, userId: number, reaction: string) {
    const messageExists = await this.prismaService.message.findUnique({
      where: {
        message_id: messageId,
      },
    });

    if (!messageExists) {
      throw new NotFoundException('Message not found');
    }

    const upsertedReaction = await this.prismaService.message_reaction.upsert({
      where: {
        message_id_user_id: {
          message_id: messageId,
          user_id: userId,
        },
      },
      create: {
        reaction,
        message_id: messageId,
        user_id: userId,
      },
      update: {
        reaction,
      },
      include: {
        message: {
          include: {
            user: true,
            replied_to_message: {
              include: {
                user: {
                  select: {
                    full_name: true,
                    username: true,
                  },
                },
              },
            },
            message_reactions: {
              include: {
                user: {
                  select: {
                    user_id: true,
                    full_name: true,
                    image: true,
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return {
      messageAfterReaction: upsertedReaction.message as message,
      groupId: messageExists.group_id,
    };
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
