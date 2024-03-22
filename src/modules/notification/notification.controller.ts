import { Controller, Logger, Param, Patch, Post, Sse } from '@nestjs/common';
import { EventsService } from './event.service';
import { GetCurrentUser, Public } from 'src/modules/auth/ParamDecorator';
import { DeleteMessageDto } from '../chat-groups/dto/delete-message.dto';
import { NotificationService } from './notification.service';
import { sendSuccessResponse } from 'src/utils/response-handler/success.response-handler';

@Controller('notifications')
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(
    private readonly eventsService: EventsService,
    private readonly notificationsService: NotificationService,
  ) {}

  // @Public()
  @Sse('events')
  events() {
    return this.eventsService.subscribe();
  }

  @Public()
  @Post('emit')
  async emit() {
    await this.eventsService.emit({
      eventName: 'warning',
      message: 1,
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
