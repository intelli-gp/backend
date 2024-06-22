import { Module } from '@nestjs/common';
import { AiServiceController } from './ai-service.controller';
import { AiServiceService } from './ai-service.service';
import { HttpModule } from '@nestjs/axios';
import { AiServiceHttpConfig } from 'src/configs/http-service/ai-service.config';
import { ProSubscriptionGuard } from 'src/common/guards/pro-subscription.guard';
import { StripeService } from '../payment/stripe.service';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { TagsService } from '../tags/tags.service';

@Module({
    imports: [
        HttpModule.registerAsync({
            useClass: AiServiceHttpConfig,
        }),
    ],
    controllers: [AiServiceController],
    providers: [
        AiServiceService,
        StripeService,
        UsersService,
        ConfigService,
        PrismaService,
        TagsService,
    ],
})
export class AiServiceModule {}
