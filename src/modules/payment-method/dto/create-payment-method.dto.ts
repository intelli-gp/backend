import { IsString, IsNotEmpty } from "class-validator";

export class CreatePaymentMethodDto {

    @IsString()
    @IsNotEmpty()
    holderName: string;
    @IsString()
    @IsNotEmpty()
    cardId: string;
    @IsString()
    @IsNotEmpty()
    cardNumber: string;
    @IsString()
    @IsNotEmpty()
    expiryDate: string;
}
