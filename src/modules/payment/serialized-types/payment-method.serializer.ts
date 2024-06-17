import { ApiProperty } from '@nestjs/swagger';
import Stripe from 'stripe';

export class SerializedPaymentMethod {
    @ApiProperty({
        type: String,
        description: 'The id of the payment method',
        example: 'pm_1J4bMjF9Qc5J5I2YFg5Zt6a8',
    })
    PaymentMethodId: string;

    @ApiProperty({
        type: String,
        description: 'The name of the card holder',
        example: 'John Doe',
    })
    CardHolderName: string;

    @ApiProperty({
        type: String,
        description: 'The brand of the card',
        example: 'Visa',
    })
    Brand: string;

    @ApiProperty({
        type: Number,
        description: 'The expiration month of the card',
        example: 12,
    })
    ExpMonth: number;

    @ApiProperty({
        type: Number,
        description: 'The expiration year of the card',
        example: 2023,
    })
    ExpYear: number;

    @ApiProperty({
        type: String,
        description: 'The funding type of the card',
        example: 'credit',
    })
    FundingType: string;

    @ApiProperty({
        type: String,
        description: 'The last four digits of the card',
        example: '4242',
    })
    LastFourDigits: string;

    @ApiProperty({
        type: Boolean,
        description:
            'Whether the payment method is the default for current customer',
        example: true,
    })
    IsDefault: boolean;

    constructor(partial: Stripe.PaymentMethod) {
        this.PaymentMethodId = partial?.id;
        this.CardHolderName = partial?.billing_details?.name;
        this.Brand = partial?.card?.brand;
        this.ExpMonth = partial?.card?.exp_month;
        this.ExpYear = partial?.card?.exp_year;
        this.FundingType = partial?.card?.funding;
        this.LastFourDigits = partial?.card?.last4;
        this.IsDefault =
            (partial?.customer as Stripe.Customer)?.invoice_settings
                .default_payment_method === partial?.id;
    }
}
