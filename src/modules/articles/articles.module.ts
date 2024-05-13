import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { TagsService } from '../tags/tags.service';

@Module({
    controllers: [ArticlesController],
    providers: [ArticlesService, TagsService],
})
export class ArticlesModule {}
