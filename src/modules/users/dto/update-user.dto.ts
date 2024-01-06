import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';
import { ToLowerCase } from 'src/utils/class-transformer-decorators/lowercase-transformer.decorator';
import { IsValidUsername } from 'src/utils/class-validator-decorators/username.decorator';

export class UpdateUserDto {
  @ApiProperty({ required: false, example: 'John32' })
  @MinLength(4)
  @IsValidUsername()
  @IsOptional()
  username: string;

  @ApiProperty({ required: false, example: 'John Doe' })
  @Length(3, 50)
  @IsOptional()
  fullName: string;

  @ApiProperty({ required: false, example: 'johndoe@gmail.com' })
  @IsEmail()
  @ToLowerCase()
  @IsOptional()
  email: string;

  @ApiProperty({
    required: false,
    example: 'My name is John doe and iam a software developer',
  })
  @MinLength(8)
  @IsOptional()
  bio: string;

  @ApiProperty({ required: false, example: 'https://image.com' })
  @IsOptional()
  @IsUrl()
  coverImage: string;

  @ApiProperty({ required: false, example: '+xx1050790880' })
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({ required: false, example: 'https://image.com' })
  @IsOptional()
  @IsUrl()
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
