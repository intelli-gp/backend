import { Injectable, Logger } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { TagsService } from '../tags/tags.service';
import { hashS10 } from '../../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tagsService: TagsService,
  ) {}

  convertUserDtoToDatabaseKeys(userData: Partial<UpdateUserDto>) {
    const userDataInput: Partial<user> = {};

    // DO NOT TRY TO REFACTOR THIS
    // THIS IS THE WAY NOT TO CREATE EMPTY VALUED KEYS IN ONE LINE

    userData.username !== undefined &&
      (userDataInput.username = userData.username);

    userData.fullName !== undefined &&
      (userDataInput.full_name = userData.fullName);
    userData.email !== undefined && (userDataInput.email = userData.email);

    userData.phoneNumber !== undefined &&
      (userDataInput.phone_number = userData.phoneNumber);

    userData.image !== undefined && (userDataInput.image = userData.image);

    userData.coverImage !== undefined &&
      (userDataInput.cover_image = userData.coverImage);

    userData.bio !== undefined && (userDataInput.bio = userData.bio);

    userData.email !== undefined && (userDataInput.email = userData.email);

    userData.dob !== undefined && (userDataInput.dob = new Date(userData.dob));

    return userDataInput;
  }

  async getUsers(): Promise<user[] | null> {
    return await this.prismaService.user.findMany();
  }

  async getUserByUsername(username: string): Promise<user | null> {
    return await this.prismaService.user.findUnique({
      where: { username: username },
    });
  }

  async getUserById(id: number): Promise<user | null> {
    return await this.prismaService.user.findUnique({ where: { user_id: id } });
  }

  async resetUsersConnectedStatus() {
    await this.prismaService.$transaction(async (prisma) => {
      await prisma.user.updateMany({
        data: {
          connected: false,
        },
      });

      await prisma.group_user.updateMany({
        data: {
          inRoom: false,
        },
      });
    });
  }

  async updateUserConnectedStatus(
    userId: number,
    connected: boolean,
  ): Promise<user | null> {
    return await this.prismaService.user.update({
      where: { user_id: userId },
      data: {
        connected: connected,
        ...(connected
          ? {}
          : {
              group_user: {
                updateMany: {
                  where: { user_id: userId },
                  data: { inRoom: false },
                },
              },
            }),
      },
    });
  }

  async updateUser(
    userData: user,
    updateUserDto: UpdateUserDto,
  ): Promise<user | null> {
    if (!updateUserDto) return null;
    const { addedInterests, removedInterests, ...userDiff } = updateUserDto;
    const user = await this.prismaService.$transaction(async () => {
      if (addedInterests || removedInterests) {
        Logger.debug({ addedInterests, removedInterests });
        await this.tagsService.updateTagsForEntities(
          addedInterests,
          removedInterests,
          'user',
          userData.user_id,
        );
      }

      const userDataInput = this.convertUserDtoToDatabaseKeys(userDiff);
      if (Object.values(userDataInput).length === 0) {
        Logger.debug('No changes to user');
        return await this.prismaService.user.findUnique({
          where: { user_id: userData.user_id },
          include: {
            user_tag: true,
            level: true,
            plan: true,
            group: {
              select: {
                group_id: true,
                title: true,
                cover_image_url: true,
                _count: {
                  select: {
                    group_user: true,
                  },
                },
              },
            },
            group_user: {
              select: {
                group: {
                  select: {
                    group_id: true,
                    title: true,
                    cover_image_url: true,
                    _count: {
                      select: {
                        group_user: true,
                      },
                    },
                  },
                },
              },
            },
            article: {
              select: {
                article_id: true,
                title: true,
                cover_image_url: true,
                created_at: true,
                article_tag: true,
              },
            },
          },
        });
      } else {
        return await this.prismaService.user.update({
          where: { user_id: userData.user_id },
          data: { ...userDataInput },
          include: {
            user_tag: true,
            level: true,
            plan: true,
            group: {
              select: {
                group_id: true,
                title: true,
                cover_image_url: true,
                _count: {
                  select: {
                    group_user: true,
                  },
                },
              },
            },
            group_user: {
              select: {
                group: {
                  select: {
                    group_id: true,
                    title: true,
                    cover_image_url: true,
                    _count: {
                      select: {
                        group_user: true,
                      },
                    },
                  },
                },
              },
            },
            article: {
              select: {
                article_id: true,
                title: true,
                cover_image_url: true,
                created_at: true,
                article_tag: true,
              },
            },
          },
        });
      }
    });

    return user ? user : null;
  }

  async updatePassword(id, password) {
    const hashedPassword = await hashS10(password);
    await this.prismaService.user.update({
      where: { user_id: id },
      data: { password: hashedPassword },
    });
    return;
  }

  async getRecommendedUsers() {
    return true;
  }
  async getUserFollowers() {
    return true;
  }

  async getUserFollowing() {
    return true;
  }

  async followUser() {
    return;
  }

  async unfollowUser() {
    return;
  }
}
