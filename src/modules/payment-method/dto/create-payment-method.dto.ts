import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreatePaymentMethodDto {
    @ApiProperty({
        description: 'The holder name',
        required: true,
        example: 'Hamed Hassan',
    })
    @IsString()
    @IsNotEmpty()
    holderName: string;
    @ApiProperty({
        description: 'The CVV',
        required: true,
        example: '123',
    })
    @IsString()
    @IsNotEmpty()
    cardId: string;
    @ApiProperty({
        description: 'The credit number',
        required: true,
        example: '4242 4242 4242 4242',
    })
    @IsString()
    @IsNotEmpty()
    cardNumber: string;

    @ApiProperty({
        description:
            'The expiry date of the credit card in the format yyyy-mm-ddThh:mm',
        pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}$',
        required: true,
        example: '2021-01-01T00:00',
    })
    @IsString()
    @IsNotEmpty()
    expiryDate: string;
}
