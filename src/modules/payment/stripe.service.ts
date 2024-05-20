import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigSchema } from 'src/utils/config-validation.schema';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(private readonly configService: ConfigService<ConfigSchema>) {
        this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2024-04-10',
            typescript: true,
        });
    }

    public async createCustomer(
        name: string,
        email: string,
    ): Promise<Stripe.Customer> {
        // TODO: maybe add a billing address here
        return this.stripe.customers.create({
            name,
            email,
        });
    }

    public async attachCreditCardToCustomer(
        paymentMethodId: string,
        customerStripeId: string,
    ): Promise<Stripe.SetupIntent> {
        return this.stripe.setupIntents.create({
            customer: customerStripeId,
            payment_method: paymentMethodId,
        });
    }

    public async listCreditCardsForCustomer(
        customerStripeId: string,
    ): Promise<Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>> {
        return this.stripe.paymentMethods.list({
            customer: customerStripeId,
            type: 'card',
        });
    }

    public async chargeCustomer(
        amount: number,
        paymentMethodId: string,
        customerStripeId: string,
    ) {
        return this.stripe.paymentIntents.create({
            amount,
            customer: customerStripeId,
            currency: this.configService.get('STRIPE_CURRENCY'),
            payment_method: paymentMethodId,
            off_session: true,
            confirm: true,
        });
    }
}
