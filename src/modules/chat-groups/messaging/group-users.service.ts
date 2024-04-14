import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { MessageReadReceipt } from './types/message-read';

@Injectable()
export class GroupUsersService {
  constructor(private readonly prismaService: PrismaService) {}
  private groupUsersLogger = new Logger('GroupUsersService');
  async isUserMemberOfGroup(userId: number, groupId: number) {
    this.groupUsersLogger.debug(
      `Checking if user ${userId} is a member of group ${groupId}`,
    );
    const groupUser = await this.prismaService.group_user.findUnique({
      where: {
        group_id_user_id: {
          group_id: groupId,
          user_id: userId,
        },
      },
    });

    this.groupUsersLogger.debug({ groupUser });

    if (!groupUser) {
      this.groupUsersLogger.debug('Returning false');
      return false;
    }

    return true;
  }

  async toggleJoinSocketRoom(
    userId: number,
    groupId: number,
    isInRoom: boolean,
  ) {
    this.groupUsersLogger.debug(`Joining user ${userId} to group ${groupId}`);

    const currentDate = new Date();

    return await this.prismaService.$transaction(async (prisma) => {
      const updatedGroupUser = await prisma.group_user.update({
        where: {
          group_id_user_id: {
            group_id: groupId,
            user_id: userId,
          },
        },
        include: {
          user: true,
          group: {
            include: {
              message: true,
            },
          },
        },
        data: {
          inRoom: !isInRoom,
          last_read: currentDate,
        },
      });

      if (!isInRoom) {
        const messagesAvailableToRead = updatedGroupUser.group.message.filter(
          (message) => {
            return (
              // updatedGroupUser.last_read >= message.created_at &&
              message.user_id !== userId
            );
          },
        );

        const readMessages: MessageReadReceipt[] = messagesAvailableToRead.map(
          (message) => {
            return {
              message_id: message.message_id,
              user_id: userId,
              read_at: updatedGroupUser.last_read,
              user: updatedGroupUser.user,
            };
          },
        );
        this.groupUsersLogger.debug({ messagesAvailableToRead });

        this.groupUsersLogger.debug({ readMessages });
        return readMessages;
      }
    });
  }
}
