import { ApiProperty } from '@nestjs/swagger';
import Stripe from 'stripe';

export class SerializedSubscription {
    @ApiProperty({
        type: String,
        description: 'The id of the subscription',
        example: 'sub_1J4bMjF9Qc5J5I2YFg5Zt6a8',
    })
    ID: string;

    @ApiProperty({
        type: String,
        description: 'The interval of the subscription',
        example: 'monthly',
    })
    Interval: 'monthly' | 'yearly';

    @ApiProperty({
        type: Date,
        description: 'The start date of the subscription',
        example: '2021-07-01T00:00:00.000Z',
    })
    StartDate: Date;

    @ApiProperty({
        type: Date,
        description: 'The renewal date of the subscription',
        example: '2021-08-01T00:00:00.000Z',
    })
    RenewalDate: Date;

    @ApiProperty({
        type: Number,
        description: 'The price of the subscription',
        example: 10,
    })
    Price: number;

    @ApiProperty({
        type: String,
        description: 'The status of the subscription',
        example: 'active',
    })
    Status: Stripe.Subscription.Status;

    constructor(subscription: Stripe.Subscription) {
        this.ID = subscription?.id;

        this.Interval =
            subscription?.items?.data?.[0]?.plan?.interval === 'month'
                ? 'monthly'
                : 'yearly';

        this.StartDate = new Date(subscription?.start_date * 1000);
        this.RenewalDate = new Date(subscription?.current_period_end * 1000);

        this.Price = subscription?.items?.data?.[0]?.plan?.amount / 100;

        this.Status = subscription?.status;
    }
}
