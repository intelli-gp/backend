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
    await this.prismaService.group_user.update({
      where: {
        group_id_user_id: {
          group_id: groupId,
          user_id: userId,
        },
      },
      data: {
        inRoom: {
          set: !isInRoom,
        },
      },
    });
  }
}
