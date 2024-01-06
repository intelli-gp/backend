import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { IsValidUsername } from 'src/utils/class-validator-decorators/username.decorator';

export class UpdateUserDto {
  @ApiProperty({ required: false, example: 'John32' })
  @MinLength(4)
  @IsValidUsername()
  @IsOptional()
  username: string;

  @ApiProperty({ required: false, example: 'John' })
  @MinLength(3)
  @IsOptional()
  fname: string;

  @ApiProperty({ required: false, example: 'Doe' })
  @MinLength(3)
  @IsOptional()
  lname: string;

  @ApiProperty({ required: false, example: 'johndoe@gmail.com' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ required: false, example: '+xx1050790880' })
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({ required: false, example: 'https://image.com' })
  @IsOptional()
  image: string;

  @ApiProperty({
    required: false,
    example: ['gaming', 'programming', 'backend'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interests: string[];
}
