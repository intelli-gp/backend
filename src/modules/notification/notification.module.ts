import { Global, Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { EventsService } from './event.service';

@Global()
@Module({
    controllers: [NotificationController],
    providers: [NotificationService, EventsService],
    exports: [NotificationService],
})
export class NotificationModule {}
