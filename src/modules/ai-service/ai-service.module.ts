import { Module } from '@nestjs/common';
import { AiServiceController } from './ai-service.controller';
import { AiServiceService } from './ai-service.service';
import { HttpModule } from '@nestjs/axios';
import { AiServiceHttpConfig } from 'src/configs/http-service/ai-service.config';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: AiServiceHttpConfig,
    }),
  ],
  controllers: [AiServiceController],
  providers: [AiServiceService],
})
export class AiServiceModule {}
