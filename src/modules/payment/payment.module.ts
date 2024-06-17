import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { StripeService } from './stripe.service';
import { UsersService } from '../users/users.service';
import { TagsService } from '../tags/tags.service';

@Module({
    controllers: [PaymentController],
    providers: [StripeService, UsersService, TagsService],
    exports: [StripeService],
})
export class PaymentModule {}
