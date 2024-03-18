import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

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
    return await this.prismaService.$transaction(async (prisma) => {
      const updatedGroupUser = await prisma.group_user.update({
        where: {
          group_id_user_id: {
            group_id: groupId,
            user_id: userId,
          },
        },
        include: {
          group: {
            include: {
              message: true,
            },
          },
        },
        data: {
          inRoom: !isInRoom,
        },
      });

      if (!isInRoom) {
        const messagesAvailableToRead = updatedGroupUser.group.message.filter(
          (message) => {
            return message.user_id !== userId;
          },
        );

        this.groupUsersLogger.debug({ messagesAvailableToRead });
        // Notice: Skip duplicates does not work with MongoDB or SQLServer
        // read all messages in this room
        await prisma.messages_read_status.createMany({
          data: messagesAvailableToRead.map((message) => {
            return {
              message_id: message.message_id,
              user_id: userId,
            };
          }),

          skipDuplicates: true,
        });

        const readMessages = await prisma.messages_read_status.findMany({
          where: {
            message_id: {
              in: messagesAvailableToRead.map((message) => message.message_id),
            },
          },
          include: {
            user: true,
          },
        });
        this.groupUsersLogger.debug({ readMessages });
        return readMessages;
      }
    });
  }
}
