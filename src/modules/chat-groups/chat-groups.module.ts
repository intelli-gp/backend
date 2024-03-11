import { Module } from '@nestjs/common';
import { ChatGroupsService } from './chat-groups.service';
// import { ChatGroupGateway } from './chat-group.gateway';
import { ChatGroupsController } from './chat-groups.controller';
import { TagsService } from '../tags/tags.service';
import { ChatGroupsGateway } from './messaging/chat-groups.gateway';
import { GroupUsersService } from './messaging/group-users.service';
import { MessagingService } from './messaging/messaging.service';
import { UsersService } from '../users/users.service';

// TODO: Add the provider for gateway
@Module({
  providers: [
    ChatGroupsService,
    TagsService,
    GroupUsersService,
    ChatGroupsGateway,
    MessagingService,
    UsersService,
  ],
  controllers: [ChatGroupsController],
})
export class ChatGroupsModule {}
