import { Module } from '@nestjs/common';
import { ChatGroupsService } from './chat-groups.service';
// import { ChatGroupGateway } from './chat-group.gateway';
import { ChatGroupsController } from './chat-groups.controller';
import { TagsService } from '../tags/tags.service';

// TODO: Add the provider for gateway
@Module({
  providers: [ChatGroupsService, TagsService],
  controllers: [ChatGroupsController],
})
export class ChatGroupsModule {}
