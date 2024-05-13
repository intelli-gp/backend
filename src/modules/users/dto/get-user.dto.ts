import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';
import {
    IsGteZero,
    IsValidUsername,
} from 'src/utils/class-validator-decorators';

export class GetSingleUserDto {
    @ApiProperty({ required: true, example: 'John32' })
    @IsNotEmpty()
    @IsValidUsername()
    Username: string;
}

export class GetSingleUserByIdDto {
    @ApiProperty({ required: true, example: 1 })
    @IsNotEmpty()
    @ToInteger()
    @IsGteZero()
    userId: number;
}
