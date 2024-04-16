import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { HttpModule } from '@nestjs/axios';
import { HttpUdemyConfigService } from 'src/configs/http-service/udemy.config';
import { TagsService } from '../tags/tags.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpUdemyConfigService,
    }),
  ],
  controllers: [CoursesController],
  providers: [CoursesService, TagsService],
})
export class CoursesModule {}
