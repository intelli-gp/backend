import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { AddPaymentMethodDto, CancelSubscriptionDto } from './dto';
import { GetCurrentUser } from '../auth/ParamDecorator';
import { StripeService } from './stripe.service';
import {
    SerializedPaymentMethod,
    SerializedSubscription,
} from './serialized-types';
import {
    ApiAcceptedResponse,
    ApiBadRequestResponse,
    ApiTags,
} from '@nestjs/swagger';
import { sendSuccessResponse } from 'src/utils/response-handler/success.response-handler';
import { ConfigService } from '@nestjs/config';
import { ConfigSchema } from 'src/utils/config-validation.schema';
import { user } from '@prisma/client';
import { swaggerSuccessExample } from 'src/utils/swagger/example-generator';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
    constructor(
        private readonly stripeService: StripeService,
        private readonly configService: ConfigService<ConfigSchema>,
    ) {}

    @Post('payment-method')
    @ApiAcceptedResponse({
        description: 'Payment method added successfully.',
        schema: swaggerSuccessExample(SerializedPaymentMethod),
    })
    @ApiBadRequestResponse({
        description: 'Failed to add payment method.',
    })
    async addPaymentMethod(
        @Body() paymentMethodData: AddPaymentMethodDto,
        @GetCurrentUser('stripe_customer_id') stripeCustomerId: string,
    ) {
        const addedPaymentMethod =
            await this.stripeService.attachCreditCardToCustomer(
                paymentMethodData.paymentMethodId,
                stripeCustomerId,
            );

        return sendSuccessResponse(
            new SerializedPaymentMethod(addedPaymentMethod),
        );
    }

    @Get('payment-method')
    @ApiAcceptedResponse({
        description: 'List of payment methods.',
        schema: swaggerSuccessExample([SerializedPaymentMethod]),
    })
    @ApiBadRequestResponse({
        description: 'Failed to list payment methods.',
    })
    async listPaymentMethods(
        @GetCurrentUser('stripe_customer_id') stripeCustomerId: string,
    ) {
        const paymentMethods =
            await this.stripeService.listCreditCardsForCustomer(
                stripeCustomerId,
            );

        return sendSuccessResponse(
            paymentMethods.map(
                (paymentMethod) => new SerializedPaymentMethod(paymentMethod),
            ),
        );
    }

    @Patch('payment-method/default')
    @ApiAcceptedResponse({
        description: 'Default payment method set successfully.',
        schema: swaggerSuccessExample(
            'Default payment method set successfully.',
        ),
    })
    @ApiBadRequestResponse({
        description: 'Failed to set default payment method.',
    })
    async setDefaultPaymentMethod(
        @Body() paymentMethodData: AddPaymentMethodDto,
        @GetCurrentUser('stripe_customer_id') stripeCustomerId: string,
    ) {
        await this.stripeService.setCreditCardAsDefaultForCustomer(
            paymentMethodData.paymentMethodId,
            stripeCustomerId,
        );
        return sendSuccessResponse('Default payment method set successfully.');
    }

    @Delete('payment-method/:paymentMethodId')
    @ApiAcceptedResponse({
        description: 'Payment method deleted successfully.',
        schema: swaggerSuccessExample('Payment method deleted successfully.'),
    })
    @ApiBadRequestResponse({
        description: 'Failed to delete payment method.',
    })
    async deletePaymentMethod(
        @Param() paymentMethodData: AddPaymentMethodDto,
        @GetCurrentUser('stripe_customer_id') stripeCustomerId: string,
    ) {
        await this.stripeService.deleteCreditCardFromCustomer(
            paymentMethodData.paymentMethodId,
            stripeCustomerId,
        );
        return sendSuccessResponse('Payment method deleted successfully.');
    }

    @Get('subscription')
    @ApiAcceptedResponse({
        description: 'Subscription details.',
        schema: swaggerSuccessExample(SerializedSubscription),
    })
    @ApiBadRequestResponse({
        description: 'Failed to get subscription details.',
    })
    async getSubscriptionForCustomer(
        @GetCurrentUser('stripe_customer_id') stripeCustomerId: string,
    ) {
        const subscription =
            await this.stripeService.getCustomerSubscriptions(stripeCustomerId);

        const result =
            subscription.data.length === 0
                ? null
                : new SerializedSubscription(subscription.data[0]);

        return sendSuccessResponse(result);
    }

    @Post('subscription/monthly')
    @ApiAcceptedResponse({
        description: 'Subscription created successfully.',
        schema: swaggerSuccessExample('Subscription created successfully.'),
    })
    @ApiBadRequestResponse({
        description: 'Failed to create subscription.',
    })
    async subscribeCustomerToPlanMonthly(@GetCurrentUser() currentUser: user) {
        await this.stripeService.subscribeCustomerToPlan(
            currentUser.user_id,
            currentUser.stripe_customer_id,
            'monthly',
        );

        return sendSuccessResponse('Subscription created successfully.');
    }

    @Post('subscription/yearly')
    @ApiAcceptedResponse({
        description: 'Subscription created successfully.',
        schema: swaggerSuccessExample('Subscription created successfully.'),
    })
    @ApiBadRequestResponse({
        description: 'Failed to create subscription.',
    })
    async subscribeCustomerToPlanYearly(@GetCurrentUser() currentUser: user) {
        await this.stripeService.subscribeCustomerToPlan(
            currentUser.user_id,
            currentUser.stripe_customer_id,
            'yearly',
        );

        return sendSuccessResponse('Subscription created successfully.');
    }

    @Patch('subscription/cancel')
    async cancelSubscriptionForCustomer(
        @Body() subscriptionData: CancelSubscriptionDto,
        @GetCurrentUser('user_id') userId: number,
    ) {
        await this.stripeService.cancelSubscription(
            userId,
            subscriptionData.subscriptionId,
        );
        return sendSuccessResponse('Subscription cancelled successfully.');
    }
}
