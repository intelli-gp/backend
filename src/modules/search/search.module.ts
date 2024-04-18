import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ChatGroupsService } from '../chat-groups/chat-groups.service';
import { TagsService } from '../tags/tags.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService, ChatGroupsService, TagsService],
})
export class SearchModule {}
