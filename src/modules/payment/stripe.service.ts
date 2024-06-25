import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigSchema } from 'src/utils/config-validation.schema';
import Stripe from 'stripe';
import StripeError from './enums/stripe-error.enum';
import { UsersService } from '../users/users.service';

@Injectable()
export class StripeService {
    private readonly logger = new Logger(StripeService.name);
    private stripe: Stripe;

    constructor(
        private readonly configService: ConfigService<ConfigSchema>,
        private readonly usersService: UsersService,
    ) {
        this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2024-04-10',
            typescript: true,
        });
    }

    async checkAndAssignDefaultCreditCard(stripeCustomerId: string) {
        // Check if there is more than one card and if not set the only card as default
        const paymentMethods =
            await this.listCreditCardsForCustomer(stripeCustomerId);
        if (paymentMethods.length === 1) {
            await this.setCreditCardAsDefaultForCustomer(
                paymentMethods[0].id,
                stripeCustomerId,
            );
        }
    }

    public async createCustomer(
        name: string,
        email: string,
    ): Promise<Stripe.Customer> {
        // TODO: maybe add a billing address here
        // TODO: delete customer on customer deletion
        return this.stripe.customers.create({
            name,
            email,
        });
    }

    public async attachCreditCardToCustomer(
        paymentMethodId: string,
        customerStripeId: string,
    ): Promise<Stripe.PaymentMethod> {
        this.logger.debug({ paymentMethodId, customerStripeId });

        const paymentMethod = await this.stripe.paymentMethods.attach(
            paymentMethodId,
            {
                customer: customerStripeId,
            },
        );

        await this.checkAndAssignDefaultCreditCard(customerStripeId);

        return paymentMethod;
    }

    public async deleteCreditCardFromCustomer(
        paymentMethodId: string,
        customerStripeId: string,
    ): Promise<Stripe.Response<Stripe.PaymentMethod>> {
        const customer = (await this.stripe.customers.retrieve(
            customerStripeId,
        )) as Stripe.Customer;

        if (
            customer.invoice_settings.default_payment_method === paymentMethodId
        ) {
            throw new BadRequestException('Cannot delete default credit card');
        }

        return await this.stripe.paymentMethods.detach(paymentMethodId);
    }

    public async listCreditCardsForCustomer(
        customerStripeId: string,
    ): Promise<Stripe.PaymentMethod[]> {
        const paymentMethods = await this.stripe.paymentMethods.list({
            customer: customerStripeId,
            type: 'card',
            expand: ['data.customer'],
        });

        return paymentMethods.data;
    }

    public async setCreditCardAsDefaultForCustomer(
        paymentMethodId: string,
        customerStripeId: string,
    ): Promise<Stripe.Customer> {
        try {
            return await this.stripe.customers.update(customerStripeId, {
                invoice_settings: {
                    default_payment_method: paymentMethodId,
                },
            });
        } catch (error) {
            if (error?.type === StripeError.InvalidRequest) {
                throw new BadRequestException('Wrong credit card chosen');
            }
            throw new InternalServerErrorException();
        }
    }

    public async subscribeCustomerToPlan(
        userId: number,
        customerStripeId: string,
        type: 'monthly' | 'yearly',
    ): Promise<Stripe.Response<Stripe.Subscription>> {
        // TODO: send email with template to customer with invoice
        // TODO: Check if there is a current subscription that has renewal deactivated just activate renewal instead of creating a new one

        const customerSubscriptions =
            await this.getCustomerSubscriptions(customerStripeId);

        if (customerSubscriptions.data.length > 0) {
            const isCanceled =
                customerSubscriptions.data[0].cancel_at_period_end;
            if (isCanceled) {
                const subscriptionId = customerSubscriptions.data[0].id;
                return this.stripe.subscriptions.update(subscriptionId, {
                    cancel_at_period_end: false,
                });
            }
            throw new BadRequestException('Subscription already exists');
        }

        const priceId =
            type === 'monthly'
                ? this.configService.get('PRO_MONTHLY_SUBSCRIPTION_PRICE_ID')
                : this.configService.get('PRO_YEARLY_SUBSCRIPTION_PRICE_ID');

        try {
            const addedSub = await this.stripe.subscriptions.create({
                customer: customerStripeId,
                items: [
                    {
                        price: priceId,
                    },
                ],
                description: 'Premium',
            });

            await this.usersService.changeUserPlan(userId, 'pro');
            return addedSub;
        } catch (error) {
            if (error?.code === StripeError.ResourceMissing) {
                throw new BadRequestException('Credit card not set up');
            }
            throw new Error(error);
        }
    }

    public async cancelSubscription(userId: number, subscriptionId: string) {
        // Don't cancel subscription immediately but cancel it at its end date
        const canceledSub = await this.stripe.subscriptions.update(
            subscriptionId,
            {
                cancel_at_period_end: true,
            },
        );

        // const subscriptionEndTime = canceledSub.current_period_end;

        // Assign this to be a cronJob that occurs at the end of the subscription
        await this.usersService.changeUserPlan(userId, 'free');
        return canceledSub;
    }

    public async getCustomerSubscriptions(customerStripeId: string) {
        // TODO: if there is no subscription return free plan
        const subscriptions = this.stripe.subscriptions.list({
            customer: customerStripeId,
        });

        this.logger.debug({ subscriptions });

        return subscriptions;
    }
}
