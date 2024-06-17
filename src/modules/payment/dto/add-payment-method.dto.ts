import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddPaymentMethodDto {
    @ApiProperty({
        description: 'The ID of the payment method to add to the customer',
        example: 'pm_1J1J7d2eZvKYlo2CJY2X7Yq6',
    })
    @IsString()
    @IsNotEmpty()
    paymentMethodId: string;
}
