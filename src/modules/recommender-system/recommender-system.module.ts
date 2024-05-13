import { Module } from '@nestjs/common';
import { RecommenderSystemController } from './recommender-system.controller';
import { RecommenderSystemService } from './recommender-system.service';
import { HttpModule } from '@nestjs/axios';
import { HttpRecommenderConfigService } from '../../configs/http-service/recommender.config';

@Module({
    imports: [
        HttpModule.registerAsync({
            useClass: HttpRecommenderConfigService,
        }),
    ],
    controllers: [RecommenderSystemController],
    providers: [RecommenderSystemService],
})
export class RecommenderSystemModule {}
