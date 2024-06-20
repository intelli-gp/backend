import { Module } from '@nestjs/common';
import { ScheduledTasksService } from './scheduled-tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { TagsService } from '../tags/tags.service';

@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [ScheduledTasksService, UsersService, TagsService],
})
export class ScheduledTasksModule {}
