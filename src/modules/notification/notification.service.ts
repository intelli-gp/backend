import { Injectable } from '@nestjs/common';
import { EventsService } from './event.service';
import { SerializedMessage } from '../chat-groups/serialized-types/messages.serializer';

@Injectable()
export class NotificationService {
  constructor(private readonly eventsService: EventsService) {}

  async emitChatNotification(data: SerializedMessage) {
    await this.eventsService.emit({
      eventName: 'chat-group-message',
      message: data,
    });
  }
}
