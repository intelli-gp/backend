import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';

@Module({
  providers: [TagsService],
})
export class TagsModule {}
