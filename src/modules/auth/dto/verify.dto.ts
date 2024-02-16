import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsValidUsername } from '../../../utils/class-validator-decorators/username.decorator';

export class SendVerificationEmailDto {
  @ApiProperty({ required: true, example: 'John32' })
  @IsNotEmpty()
  @MinLength(4)
  @IsValidUsername()
  username: string;
}
export class VerifyUserDto extends SendVerificationEmailDto {
  @ApiProperty({ required: true, example: 'a valid token' })
  @IsString()
  @IsNotEmpty()
  token: string;
}
