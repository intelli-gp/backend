import {
  Body,
  Controller,
  Get,
  Logger,
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
import { Prisma } from '@prisma/client';
import { SerializedUserNotifications } from './serilaized-types/notifications.serializer';
import { ViewNotificationDto } from './dto/view-notification.dto';

@Controller('notifications')
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(
    private readonly eventsService: EventsService,
    private readonly notificationsService: NotificationService,
  ) {}

  // @Public()
  @Sse('events')
  async events(@GetCurrentUser('user_id') userId: number) {
    return await this.eventsService.subscribe(userId);
  }

  // @Public()
  // @Post('emit')
  // async emit() {
  //   await this.eventsService.emit({
  //     eventName: 'warning',
  //     message: 1,
  //   });
  // }

  @ApiResponse({
    status: 200,
    description: 'Get all messages notifications for the user',
    schema: swaggerSuccessExample(
      null,
      multipleUserNotificationsResponseExample,
    ),
  })
  @Get('/messages')
  async getMessagesNotifications(@GetCurrentUser('user_id') userId) {
    this.logger.log(`Getting messages for user ${userId}`);
    const messagesNotifications =
      await this.notificationsService.getGroupUserMessageNotifications(userId);

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
      await this.notificationsService.getUserNotifications(userId);

    return sendSuccessResponse(
      new SerializedUserNotifications(
        userWithNotifications as Prisma.userWhereInput,
        paginationData,
      ),
    );
  }

  @Patch('read')
  async markNotificationAsViewed(
    @GetCurrentUser('user_id') userId: number,
    @Body() notificationData: ViewNotificationDto,
  ) {
    this.logger.log(`Marking notification ${notificationData.ID} as viewed`);
    await this.notificationsService.viewSingleUserNotification(
      userId,
      notificationData,
    );

    return sendSuccessResponse('Notification marked as viewed');
  }
}
