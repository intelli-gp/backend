import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { EventsService } from './event.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, EventsService],
})
export class NotificationModule {}
