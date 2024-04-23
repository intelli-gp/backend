import { Module } from '@nestjs/common';
import { RecommenderSystemController } from './recommender-system.controller';
import { RecommenderSystemService } from './recommender-system.service';

@Module({
  controllers: [RecommenderSystemController],
  providers: [RecommenderSystemService],
})
export class RecommenderSystemModule {}
