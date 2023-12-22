import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TagsService } from '../tags/tags.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, TagsService],
  exports: [UsersService],
})
export class UsersModule {}
