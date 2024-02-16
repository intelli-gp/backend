import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ToLowerCase } from '../../../utils/class-transformer-decorators/lowercase-transformer.decorator';
import { IsStrongPassword } from '../../../utils/class-validator-decorators/password.decorator';

export class ResetPasswordDto {
  @ApiProperty({ required: true, example: 'John32@gmail.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ToLowerCase()
  email: string;
}

export class ResetPasswordConfirmationParamDto extends ResetPasswordDto {
  @ApiProperty({ required: true, example: 'Standard JWT token' })
  @IsNotEmpty()
  @IsString()
  token: string;
}

export class ResetPasswordConfirmationBodyDto {
  @ApiProperty({ required: true, example: 'Testpassword@1234' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
