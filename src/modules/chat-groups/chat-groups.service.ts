import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateChatGroupDto } from './dto/create-chat-group.dto';
import { PrismaService } from '../prisma/prisma.service';
import { DeserializedChatGroup } from './serialized-types/chat-group.deserializer';
import { PaginationDto } from 'src/common/dto';
import { GroupUserTypeEnum, group, group_user } from '@prisma/client';
import { UpdateChatGroupDto } from './dto/update-chat-group.dto';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class ChatGroupsService {
  private logger = new Logger('ChatGroupsService');
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tagsService: TagsService,
  ) {}
  async createChatGroup(
    createChatGroupDto: CreateChatGroupDto,
    userId: number,
  ): Promise<group> {
    const { GroupTags, ...chatGroupData } = createChatGroupDto;
    const deserializedChatGroup = new DeserializedChatGroup(chatGroupData);
    this.logger.debug({ ...deserializedChatGroup });

    const createdChatGroup = await this.prismaService.group.create({
      data: {
        ...deserializedChatGroup,
        created_by: userId,
        group_user: {
          create: {
            user_id: userId,
            type: GroupUserTypeEnum.ADMIN,
          },
        },
      },
    });

    await this.tagsService.addTagsForEntities(
      GroupTags,
      'group',
      createdChatGroup.group_id,
    );

    const chatGroup = await this.prismaService.group.findUnique({
      where: {
        group_id: createdChatGroup.group_id,
      },
      include: {
        group_tag: true,
        group_user: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });
    return chatGroup;
  }

  async getChatGroups(
    paginationData: PaginationDto,
    chatGroupId: number,
  ): Promise<group[]> {
    if (chatGroupId) {
      const chatGroup = await this.prismaService.group.findUnique({
        where: {
          group_id: chatGroupId,
        },
        include: {
          group_tag: true,
          group_user: {
            include: {
              user: true,
            },
          },
          user: true,
        },
      });
      return [chatGroup];
    } else {
      const chatGroups = await this.prismaService.group.findMany({
        skip: paginationData.offset,
        take: paginationData.limit,
        include: {
          group_tag: true,
          group_user: {
            include: {
              user: true,
            },
          },
          user: true,
        },
      });
      return chatGroups;
    }
  }

  async getChatGroupsJoinedByUser(
    paginationData: PaginationDto,
    userId: number,
  ): Promise<group[]> {
    const chatGroups = await this.prismaService.group.findMany({
      take: paginationData.limit,
      skip: paginationData.offset,
      where: {
        group_user: {
          some: {
            user_id: userId,
            joining_status: true,
          },
        },
      },
      include: {
        group_tag: true,
        group_user: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });
    return chatGroups;
  }

  async getChatGroupsCreatedByUser(
    paginationData: PaginationDto,
    userId: number,
  ): Promise<group[]> {
    const chatGroups = await this.prismaService.group.findMany({
      take: paginationData.limit,
      skip: paginationData.offset,
      where: {
        created_by: userId,
      },
      include: {
        group_tag: true,
        group_user: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });
    return chatGroups;
  }

  async updateChatGroup(
    chatGroupId: number,
    updateData: UpdateChatGroupDto,
    userId: number,
  ): Promise<group> {
    if (!updateData) throw new BadRequestException('Update data is required');

    if (!chatGroupId)
      throw new BadRequestException('Chat group Id is required');

    const { AddedGroupTags, RemovedGroupTags, ...deserializableData } =
      updateData;
    const deserializedChatGroup = new DeserializedChatGroup(deserializableData);

    if (AddedGroupTags || RemovedGroupTags) {
      await this.tagsService.updateTagsForEntities(
        AddedGroupTags,
        RemovedGroupTags,
        'group',
        chatGroupId,
      );
    }

    const currentGroupUser = await this.prismaService.group_user.findUnique({
      where: {
        group_id_user_id: {
          user_id: userId,
          group_id: chatGroupId,
        },
      },
    });
    if (
      !currentGroupUser ||
      currentGroupUser.type !== GroupUserTypeEnum.ADMIN
    ) {
      throw new ForbiddenException(
        'User not authorized to update the chat group',
      );
    }

    const updatedChatGroup = await this.prismaService.group.update({
      where: {
        group_id: chatGroupId,
      },
      data: {
        ...deserializedChatGroup,
      },
      include: {
        group_tag: true,
        group_user: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });
    return updatedChatGroup;
  }

  async joinChatGroup(
    userId: number,
    chatGroupId: number,
  ): Promise<group_user> {
    const joinedUser = await this.prismaService.group_user.upsert({
      where: {
        group_id_user_id: {
          user_id: userId,
          group_id: chatGroupId,
        },
      },
      update: {
        joining_status: true,
      },
      create: {
        user_id: userId,
        group_id: chatGroupId,
        type: GroupUserTypeEnum.MEMBER,
        joined_at: new Date(),
      },
    });
    if (!joinedUser) {
      throw new NotFoundException('Chat group not found');
    }
    return joinedUser;
  }

  async leaveChatGroup(userId: number, chatGroupId: number): Promise<string> {
    // TODO: Handle what happens when the user is the last admin in the group
    // check that user is owner of the group
    const owner = await this.prismaService.group.findUnique({
      where: {
        group_id: chatGroupId,
        created_by: userId,
      },
    });
    if (owner) {
      throw new ForbiddenException(
        'Owner of the chat group cannot leave the chat group',
      );
    }
    const user = await this.prismaService.group_user.update({
      where: {
        group_id_user_id: {
          user_id: userId,
          group_id: chatGroupId,
        },
      },
      data: {
        joining_status: false,
      },
    });
    if (!user) {
      throw new NotFoundException('Chat group not found');
    }
    return 'User left the chat group';
  }

  async updateUserPermission(
    chatGroupId: number,
    currentUserId: number,
    targetUserId: number,
    permissionLevel: GroupUserTypeEnum,
  ): Promise<group_user> {
    const currentUser = await this.prismaService.group_user.findUnique({
      where: {
        group_id_user_id: {
          user_id: currentUserId,
          group_id: chatGroupId,
        },
      },
    });
    if (!currentUser || currentUser.type !== GroupUserTypeEnum.ADMIN) {
      throw new ForbiddenException(
        'User not authorized to update the user permission',
      );
    }
    // check that the target user is not the owner of the group
    const owner = await this.prismaService.group.findUnique({
      where: {
        group_id: chatGroupId,
        created_by: targetUserId,
      },
    });

    if (owner) {
      throw new ForbiddenException('Owner of the chat group cannot be updated');
    }
    const updatedTargetUser = await this.prismaService.group_user.update({
      where: {
        group_id_user_id: {
          user_id: targetUserId,
          group_id: chatGroupId,
        },
      },
      data: {
        type: permissionLevel,
      },
    });
    if (!updatedTargetUser) {
      throw new NotFoundException('User not found');
    }
    return updatedTargetUser;
  }

  async deleteChatGroup(chatGroupId: number, userId: number): Promise<string> {
    if (!chatGroupId)
      throw new BadRequestException('Chat group Id is required');
    const deletedChatGroup = await this.prismaService.group.delete({
      where: {
        group_id: chatGroupId,
        created_by: userId,
      },
    });
    if (!deletedChatGroup) {
      throw new ForbiddenException(
        'Chat group not found or user not authorized to delete the chat group',
      );
    }
    return 'Chat group deleted successfully';
  }
}
