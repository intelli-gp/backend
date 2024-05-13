import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class OtpDto {
    @ApiProperty({
        description: 'OTP to verify',
        example: '123456',
    })
    @IsString()
    @IsNotEmpty()
    @Length(6, 6, { message: 'OTP must be 6 characters long' })
    otp: string;
}
