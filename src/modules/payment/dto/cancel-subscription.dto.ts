import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CancelSubscriptionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    subscriptionId: string;
}
