import {
    Controller,
    Get,
    Logger,
    Param,
    Patch,
    Query,
    Sse,
} from '@nestjs/common';
import { EventsService } from './event.service';
import { GetCurrentUser } from 'src/modules/auth/ParamDecorator';
import { NotificationService } from './notification.service';
import { sendSuccessResponse } from 'src/utils/response-handler/success.response-handler';
import { SerializedMessagesNotifications } from './serilaized-types/message-notification.serialized';
import { ApiResponse } from '@nestjs/swagger';
import { swaggerSuccessExample } from 'src/utils/swagger/example-generator';
import { multipleUserNotificationsResponseExample } from './swagger-examples';
import { PaginationDto } from 'src/common/dto';
import { article, notifications } from '@prisma/client';
import { SerializedUserNotification } from './serilaized-types/notifications.serializer';
import {
    NOTIFICATION_TYPES,
    NotificationType,
} from './enums/notification-primary-types.enum';
import { ArticleNotificationType } from './enums/article-notifications.enum';
import { GetNotificationDto } from './dto/get-notification.dto';

@Controller('notifications')
export class NotificationController {
    private readonly logger = new Logger(NotificationController.name);

    constructor(
        private readonly eventsService: EventsService,
        private readonly notificationsService: NotificationService,
    ) {}

    @Sse('events')
    async events(@GetCurrentUser('user_id') userId: number) {
        return await this.eventsService.subscribe(userId);
    }

    @ApiResponse({
        status: 200,
        description: 'Get all messages notifications for the user',
        schema: swaggerSuccessExample(
            null,
            multipleUserNotificationsResponseExample,
        ),
    })
    @Get('/messages')
    async getMessagesNotifications(@GetCurrentUser('user_id') userId: number) {
        this.logger.log(`Getting messages for user ${userId}`);
        const messagesNotifications =
            await this.notificationsService.getGroupUserMessageNotifications(
                userId,
            );

        return messagesNotifications.map((messageNotification) => {
            return new SerializedMessagesNotifications(messageNotification);
        });
    }

    @Get()
    async getUserNotifications(
        @GetCurrentUser('user_id') userId: number,
        @Query() paginationData: PaginationDto,
    ) {
        this.logger.log(`Getting notifications for user ${userId}`);
        const userWithNotifications =
            await this.notificationsService.getUserNotifications(
                userId,
                paginationData,
            );

        return sendSuccessResponse(
            userWithNotifications.map((notification) => {
                switch (notification.primary_type) {
                    case NOTIFICATION_TYPES.ARTICLE: {
                        return new SerializedUserNotification<
                            NotificationType<'ARTICLE'>,
                            ArticleNotificationType<void>
                        >(notification as notifications & { entity: article });
                    }
                    case NOTIFICATION_TYPES.FOLLOW: {
                        return new SerializedUserNotification<
                            NotificationType<'FOLLOW'>,
                            null
                        >(notification as notifications & { entity: null });
                    }
                    default:
                        break;
                }
            }),
        );
    }

    @Patch('read/:notificationID([0-9]+)')
    async readUserNotification(@Param() notificationData: GetNotificationDto) {
        this.logger.log(
            `Marking notification ${notificationData.notificationID} as viewed`,
        );
        await this.notificationsService.readUserNotification(
            notificationData.notificationID,
        );

        return sendSuccessResponse('Notification marked as viewed');
    }
}
