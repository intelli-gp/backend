import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ToLowerCase } from 'src/utils/class-transformer-decorators/lowercase-transformer.decorator';

export class LoginDto {
    @ApiProperty({ required: true, example: 'John@admin.com' })
    @IsNotEmpty()
    @IsEmail()
    @ToLowerCase()
    email: string;

    @ApiProperty({ required: true, example: 'Testpassword@1234' })
    @IsNotEmpty()
    @IsString()
    password: string;
}
