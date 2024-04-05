import { Controller, Get, Logger, Param, Patch, Sse } from '@nestjs/common';
import { EventsService } from './event.service';
import { GetCurrentUser } from 'src/modules/auth/ParamDecorator';
import { DeleteMessageDto } from '../chat-groups/dto/delete-message.dto';
import { NotificationService } from './notification.service';
import { sendSuccessResponse } from 'src/utils/response-handler/success.response-handler';
import { SerializedMessagesNotifications } from './serilaized-types/message-notification.serialized';
import { ApiResponse } from '@nestjs/swagger';
import { swaggerSuccessExample } from 'src/utils/swagger/example-generator';
import { multipleUserNotificationsResponseExample } from './swagger-examples';

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

  @Patch('/messages/view/:MessageID')
  async markMessagesAsViewed(
    @GetCurrentUser('user_id') userId,
    @Param() dto: DeleteMessageDto,
  ) {
    this.logger.log(`Marking message as viewed for user ${userId}`);
    await this.notificationsService.markMessageNotificationAsViewed(
      userId,
      dto.MessageID,
    );
    return sendSuccessResponse('Message marked as viewed');
  }
}
