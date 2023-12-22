import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ required: true, example: 'John32' })
  @IsNotEmpty()
  @MinLength(4)
  username: string;
}
