import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { EventsService } from './event.service';
import { PrismaService } from '../prisma/prisma.service';
import { article, notifications } from '@prisma/client';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import {
    ArticleNotification,
    ChatGroupMessagesNotification,
    NotificationEvents,
} from './types/notifications';
import {
    NOTIFICATION_TYPES,
    NotificationType,
} from './enums/notification-primary-types.enum';
import { PaginationDto } from 'src/common/dto';
import { SerializedUserNotification } from './serilaized-types/notifications.serializer';
import { ArticleNotificationType } from './enums/article-notifications.enum';
import { NotificationRecipient } from './types/notification-recepient';

@Injectable()
export class NotificationService {
    private readonly NotificationServiceLogger = new Logger(
        NotificationService.name,
    );
    constructor(
        private readonly eventsService: EventsService,
        private readonly prismaService: PrismaService,
    ) {}

    deserializeNotification(notification: CreateNotificationDto) {
        return {
            sender_id: notification.SenderID,
            receiver_id: notification.ReceiverID,
            primary_type: notification.PrimaryType,
            secondary_type: notification.SubType,
            entity_id: notification.EntityID,
        } as notifications;
    }

    validateNotification(notificationData: CreateNotificationDto) {
        this.NotificationServiceLogger.debug({
            notificationData,
        });
        const validatedNotification = plainToInstance(
            CreateNotificationDto,
            notificationData,
            {
                enableImplicitConversion: true,
            },
        );
        const errors = validateSync(validatedNotification, {
            skipMissingProperties: false,
        });
        if (errors.length > 0) {
            this.NotificationServiceLogger.error({
                errorMsgs: errors.toString(),
            });
            throw new BadRequestException(
                `Error creating notification ${errors.toString()}`,
            );
        }

        return notificationData;
    }

    async createNotification(notification: CreateNotificationDto) {
        this.NotificationServiceLogger.log(
            `Creating notification entity for receiver ${notification.ReceiverID} from sender ${notification.SenderID} of type ${notification.PrimaryType} with subType ${notification.SubType} and entity id ${notification.EntityID}`,
        );

        // maybe validation is not needed as its not exposed to client
        // validate notification data
        const validatedNotification = this.validateNotification(notification);

        const deserializeNotification = this.deserializeNotification(
            validatedNotification,
        );

        const notificationCreated =
            await this.prismaService.notifications.create({
                data: deserializeNotification,
                include: {
                    sender: true,
                },
            });

        // TODO: find a cleaner way to resolve this issue

        // I was doing this from the start to obtain notification ID
        switch (notificationCreated.primary_type) {
            case NOTIFICATION_TYPES.ARTICLE: {
                const article = await this.prismaService.article.findUnique({
                    where: {
                        article_id: notificationCreated.entity_id,
                    },
                });
                const notificationWithEntity = {
                    ...notificationCreated,
                    entity: article,
                } as notifications & { entity: article };
                return new SerializedUserNotification<
                    NotificationType<'ARTICLE'>,
                    ArticleNotificationType<void>
                >(notificationWithEntity);
            }
            case NOTIFICATION_TYPES.FOLLOW: {
                const notificationWithEntity = {
                    ...notificationCreated,
                    entity: null,
                } as notifications & { entity: null };

                return new SerializedUserNotification<
                    NotificationType<'FOLLOW'>,
                    null
                >(notificationWithEntity);
            }
            default: {
                this.NotificationServiceLogger.error(
                    'Unknown notification type',
                );
                break;
            }
        }
    }

    async createManyNotifications(notifications: CreateNotificationDto[]) {
        this.NotificationServiceLogger.log(
            `Creating bulk notifications for ${notifications.length} entities`,
        );

        const allNotifications = await Promise.all(
            notifications.map(async (notification) => {
                return await this.createNotification(notification);
            }),
        );

        return allNotifications;
    }

    async getGroupUserMessageNotifications(
        userId: number,
    ): Promise<ChatGroupMessagesNotification[]> {
        this.NotificationServiceLogger.log(
            `Getting message notifications for user ${userId}`,
        );
        /**
         * Steps:
         * 1. Get all groups the user is a member of by getting all group users records for certain user
         * 2. Get all messages in the group that the user has not read yet
         * by checking the last read of the group user and comparing it to the message created At
         * 3. Return the last message for each group and the number of unread messages
         */

        const groupUsers = await this.prismaService.group_user.findMany({
            where: {
                user_id: userId,
                joining_status: true,
            },
            include: {
                group: {
                    include: {
                        message: {
                            orderBy: {
                                message_id: 'asc',
                            },
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });

        const messagesNotifications = groupUsers.map((groupUser) => {
            const readTimeThreshold = groupUser.last_read;
            if (!readTimeThreshold) {
                return;
            }
            /**
             * Get all messages in the group that the user has not read yet
             * by checking the last read of the group user and comparing it to the message created At
             * Note: These messages cannot be created by the user himself
             */
            const unreadMessages = groupUser?.group?.message.filter(
                (message) =>
                    message.created_at > readTimeThreshold &&
                    message.user_id !== userId,
            );

            this.NotificationServiceLogger.debug({
                unreadMessagesCount: unreadMessages.length,
            });

            // Return the last message for each group and the number of unread messages

            const lastMessage =
                groupUser?.group?.message[groupUser.group.message.length - 1];

            const unreadMessagesCount = unreadMessages.length;

            if (unreadMessagesCount > 0) {
                // this.NotificationServiceLogger.debug({
                //   GroupMessages: groupUser?.group?.message,
                // });
                this.NotificationServiceLogger.debug({ unreadMessages });
            }
            // A precautionary measure to avoid circular JSON
            delete groupUser.group.message;

            return {
                group: groupUser.group,
                lastMessage,
                unreadMessagesCount,
            };
        });

        // this.NotificationServiceLogger.debug({ messagesNotifications });

        return messagesNotifications;
    }

    async getUserNotifications(userId: number, paginationData: PaginationDto) {
        this.NotificationServiceLogger.log(
            `Getting notifications for user ${userId}`,
        );

        const notifications = await this.prismaService.notifications.findMany({
            take: paginationData.limit,
            skip: paginationData.offset,
            where: {
                receiver_id: userId,
            },
            include: {
                sender: true,
            },
            orderBy: {
                created_at: 'desc',
            },
        });

        // fill the entity
        const filledNotifications = await Promise.all(
            notifications.map(async (notification) => {
                switch (notification.primary_type) {
                    case NOTIFICATION_TYPES.ARTICLE: {
                        const article =
                            await this.prismaService.article.findUnique({
                                where: {
                                    article_id: notification.entity_id,
                                },
                            });
                        return {
                            ...notification,
                            entity: article,
                        } as notifications & { entity: article };
                    }
                    case NOTIFICATION_TYPES.FOLLOW: {
                        return {
                            ...notification,
                            entity: null,
                        } as notifications & { entity: null };
                    }
                    default: {
                        this.NotificationServiceLogger.error(
                            'Unknown notification type',
                        );
                        break;
                    }
                }
            }),
        );

        return filledNotifications;
    }

    async readUserNotification(notificationId: number) {
        this.NotificationServiceLogger.log(
            `Marking notification ${notificationId} as read`,
        );

        await this.prismaService.notifications.update({
            where: {
                notification_id: notificationId,
            },
            data: {
                is_read: true,
            },
        });
    }

    async emitNotification(
        recipients: NotificationRecipient[],
        notificationData: NotificationEvents,
        store = true,
    ) {
        this.NotificationServiceLogger.log(
            `Emitting notification to ${recipients.length} users`,
        );

        this.NotificationServiceLogger.debug({
            recipients,
            notificationData,
        });

        // Create the notification entity
        if (store) {
            let entityId = 0;

            switch (notificationData.EventName) {
                case NOTIFICATION_TYPES.ARTICLE:
                    entityId = +(notificationData as ArticleNotification).Entity
                        .ID;
                    break;
                default:
                    break;
            }

            const notifications = recipients.map(({ recipientId }) => ({
                SenderID: notificationData.Sender.ID,
                ReceiverID: recipientId,
                PrimaryType: notificationData.EventName,
                SubType: notificationData.Type,
                EntityID: entityId,
            }));

            const createdNotifications =
                await this.createManyNotifications(notifications);

            await Promise.all(
                recipients.map(async ({ recipientId, isMuted }, index) => {
                    await this.eventsService.emitToUser(
                        recipientId,
                        notificationData,
                        isMuted,
                    );
                }),
            );
        } else {
            this.NotificationServiceLogger.debug('Emitting notification event');
            this.eventsService.emit(recipients, notificationData);
        }
    }
}
