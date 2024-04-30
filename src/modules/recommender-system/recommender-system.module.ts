import { Module } from '@nestjs/common';
import { RecommenderSystemController } from './recommender-system.controller';
import { RecommenderSystemService } from './recommender-system.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [RecommenderSystemController],
  providers: [RecommenderSystemService],
})
export class RecommenderSystemModule {}
