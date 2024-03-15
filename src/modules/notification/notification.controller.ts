import { Controller, Logger, Post, Sse } from '@nestjs/common';
import { EventsService } from './event.service';
import { Public } from 'src/modules/auth/ParamDecorator';

@Controller('notifications')
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(private readonly eventsService: EventsService) {}

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
}
