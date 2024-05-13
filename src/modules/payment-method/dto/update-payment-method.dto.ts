import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentMethodDto } from './create-payment-method.dto';
import { IsOptional } from 'class-validator';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';
import { IsGteZero } from 'src/utils/class-validator-decorators';

export class UpdatePaymentMethodDto extends PartialType(
    CreatePaymentMethodDto,
) {}
export class GetPaymentMethodsDto {
    @IsOptional()
    @ToInteger()
    @IsGteZero()
    ID?: number;
}
