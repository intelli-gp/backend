import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false, example: 'John32' })
  @MinLength(4)
  username: string;

  @ApiProperty({ required: false, example: 'John' })
  @MinLength(3)
  fname: string;

  @ApiProperty({ required: false, example: 'Doe' })
  @MinLength(3)
  lname: string;

  @ApiProperty({ required: false, example: 'johndoe@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false, example: '+xx1050790880' })
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({ required: false, example: 'https://image.com' })
  image: string;

  @ApiProperty({
    required: false,
    example: ['gaming', 'programming', 'backend'],
  })
  @IsArray()
  @IsString({ each: true })
  interests: string[];
}
