import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { StripeService } from './stripe.service';

@Module({
    controllers: [PaymentController],
    providers: [PaymentService, StripeService],
    exports: [StripeService],
})
export class PaymentModule {}
