import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { TagsService } from '../tags/tags.service';
import { hashS10 } from '../../utils/bcrypt';
import { NotificationService } from '../notification/notification.service';
import { PaginationDto } from 'src/common/dto';
import { NOTIFICATION_TYPES } from '../notification/enums/notification-primary-types.enum';
import { SerializedUser } from './serialized-types/serialized-user';
import { UpdateMuteSettingsDto } from './dto/update-mute-settings.dto';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    constructor(
        private readonly prismaService: PrismaService,
        private readonly tagsService: TagsService,
        private readonly notificationsService: NotificationService,
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

        userData.dob !== undefined &&
            (userDataInput.dob = new Date(userData.dob));

        userData.headline !== undefined &&
            (userDataInput.headline = userData.headline);

        return userDataInput;
    }

    async getUsers(): Promise<user[] | null> {
        return await this.prismaService.user.findMany();
    }

    async getUserById(id: number): Promise<user | null> {
        return await this.prismaService.user.findUnique({
            where: { user_id: id },
        });
    }

    async getUserByUsername(username: string) {
        // TODO: do as docs say and add an index to improve performance
        // cite: case insensitive filtering in prisma
        /**
         *      We need case sensitive search here so implement above remarks in email instead
         *   of lowering the case in the dto
         */
        const user = await this.prismaService.user.findUnique({
            where: {
                username,
            },
            include: {
                user_tag: true,
                level: true,
                plan: true,
                group: {
                    select: {
                        group_id: true,
                        title: true,
                        cover_image_url: true,
                        user: true,
                        group_user: {
                            include: {
                                user: true,
                            },
                        },
                        group_tag: true,
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
                                group_tag: true,
                                group_user: {
                                    include: {
                                        user: true,
                                    },
                                },
                                user: true,
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
                        user: true,
                    },
                },
                payment_method: {
                    select: {
                        method_id: true,
                        card_number: true,
                        created_at: true,
                        holder_name: true,
                        expiry_date: true,
                        user: true,
                    },
                },
            },
        });

        if (!user) throw new NotFoundException('User not found');

        return user;
    }

    async resetUsersConnectedStatus() {
        await this.prismaService.$transaction(async (prisma) => {
            await prisma.user.updateMany({
                data: {
                    connected: false,
                },
            });

            await prisma.group_user.updateMany({
                where: { inRoom: true },
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
                        payment_method: {
                            select: {
                                method_id: true,
                                card_number: true,
                                created_at: true,
                                holder_name: true,
                                expiry_date: true,
                                user: true,
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
                        payment_method: {
                            select: {
                                method_id: true,
                                card_number: true,
                                created_at: true,
                                holder_name: true,
                                expiry_date: true,
                                user: true,
                            },
                        },
                    },
                });
            }
        });

        return user ? user : null;
    }

    async updateUserMuteSettings(
        userId: number,
        settings: UpdateMuteSettingsDto,
    ) {
        if (!settings) throw new BadRequestException('No settings provided');

        const data: Record<string, any> = {};

        if (settings.IsAllNotificationsMuted !== undefined) {
            data.is_notifications_muted = settings.IsAllNotificationsMuted;
        }
        if (settings.IsGroupNotificationsMuted !== undefined) {
            data.is_group_notifications_muted =
                settings.IsGroupNotificationsMuted;
        }
        if (settings.IsArticleNotificationsMuted !== undefined) {
            data.is_article_notifications_muted =
                settings.IsArticleNotificationsMuted;
        }
        if (settings.IsFollowNotificationsMuted !== undefined) {
            data.is_follow_notifications_muted =
                settings.IsFollowNotificationsMuted;
        }

        return await this.prismaService.user.update({
            where: { user_id: userId },
            data,
        });
    }
    async updatePassword(id: number, password: string) {
        const hashedPassword = await hashS10(password);
        await this.prismaService.user.update({
            where: { user_id: id },
            data: { password: hashedPassword },
        });
        return;
    }

    async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
        await this.prismaService.user.update({
            where: { user_id: userId },
            data: { two_factor_auth_secret: secret },
        });
        return;
    }

    async toggleTwoFactorAuthenticationStatus(userId: number, status: boolean) {
        await this.prismaService.user.update({
            where: { user_id: userId },
            data: { two_factor_auth_enabled: status },
        });
        // when disabling 2fa clear the secret
        if (!status) {
            this.logger.debug('Disabling 2FA');
            await this.setTwoFactorAuthenticationSecret(null, userId);
        }
        return;
    }

    async getUserFollowers(userId: number, paginationData: PaginationDto) {
        const user = await this.prismaService.user.findUnique({
            where: { user_id: userId },
            select: {
                followers_count: true,
                followed_by: {
                    take: paginationData.limit,
                    skip: paginationData.offset,
                    select: {
                        follower: {
                            select: {
                                user_id: true,
                                username: true,
                                full_name: true,
                                image: true,
                            },
                        },
                    },
                },
            },
        });

        const followers = user.followed_by.map(
            (follow) => follow.follower,
        ) as user[];
        return { followers, followersCount: user.followers_count };
    }

    async getUserFollowing(userId: number, paginationData: PaginationDto) {
        const user = await this.prismaService.user.findUnique({
            where: { user_id: userId },
            select: {
                following_count: true,
                follows: {
                    take: paginationData.limit,
                    skip: paginationData.offset,
                    select: {
                        followed: {
                            select: {
                                user_id: true,
                                username: true,
                                full_name: true,
                                image: true,
                            },
                        },
                    },
                },
            },
        });
        const following = user.follows.map(
            (follow) => follow.followed,
        ) as user[];
        return { following, followingCount: user.following_count };
    }

    async toggleFollowUser(followerId: number, followedId: number) {
        //TODO: when deleting a user reduce followers count for each user he is following and each user following him
        // check if the user is already following the target
        const isFollowing = await this.prismaService.follows.findFirst({
            where: {
                follower_id: followerId,
                followed_id: followedId,
            },
        });

        if (isFollowing) {
            // if the user is already following the target, unfollow the target
            return await this.unFollowUser(followerId, followedId);
        } else {
            // if the user is not following the target, follow the target
            return await this.followUser(followerId, followedId);
        }
    }

    /**
     *
     * @param followerId the current user id
     * @param followedId the target user id
     * @returns current user following count
     */
    async followUser(followerId: number, followedId: number) {
        // update the user followers_count and create a new follows record
        const user = await this.prismaService.user.update({
            where: { user_id: followerId },
            select: {
                following_count: true,
                user_id: true,
                full_name: true,
                username: true,
                image: true,
            },
            data: {
                following_count: {
                    increment: 1,
                },
                follows: {
                    create: {
                        followed_id: followedId,
                    },
                },
            },
        });

        const followedUser = await this.prismaService.user.update({
            where: { user_id: followedId },
            data: {
                followers_count: {
                    increment: 1,
                },
            },
        });
        this.logger.debug(`Followers count: ${user.following_count}`);

        const recipients = [
            {
                recipientId: followedId,
                isMuted:
                    followedUser.is_notifications_muted ||
                    followedUser.is_follow_notifications_muted,
            },
        ];

        this.notificationsService.emitNotification(recipients, {
            EventName: NOTIFICATION_TYPES.FOLLOW,
            Sender: new SerializedUser(user),
            Type: null,
            Entity: null,
        });

        return user.following_count;
    }

    /**
     *
     * @param unFollowerId the current user id
     * @param unFollowedId the target user id
     * @returns current user following count
     */
    async unFollowUser(unFollowerId: number, unFollowedId: number) {
        // update the user followers_count and delete the follows record
        const user = await this.prismaService.user.update({
            where: { user_id: unFollowerId },
            select: { following_count: true },
            data: {
                following_count: {
                    decrement: 1,
                },
                follows: {
                    delete: {
                        followed_id_follower_id: {
                            followed_id: unFollowedId,
                            follower_id: unFollowerId,
                        },
                    },
                },
            },
        });

        await this.prismaService.user.update({
            where: { user_id: unFollowedId },
            data: {
                followers_count: {
                    decrement: 1,
                },
            },
        });
        this.logger.debug(`Followers count: ${user.following_count}`);

        return user.following_count;
    }

    async changeUserPlan(userId: number, plan: 'free' | 'pro') {
        const planMap = {
            free: 1,
            pro: 2,
        };
        await this.prismaService.user.update({
            where: { user_id: userId },
            data: {
                plan_id: planMap[plan],
            },
        });
    }

    /** Tokens */

    async clearUsersRefreshTokens() {
        await this.prismaService.user.updateMany({
            data: {
                hashed_refresh_token: null,
            },
        });
    }
}
