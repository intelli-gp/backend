import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class VerifyUserDto {
  @ApiProperty({ required: true, example: 'John32' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ required: true, example: 'John32' })
  @IsNotEmpty()
  @MinLength(4)
  username: string;
}
