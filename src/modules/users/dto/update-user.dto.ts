import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';
import { ToLowerCase } from '../../../utils/class-transformer-decorators/lowercase-transformer.decorator';
import { IsValidAge } from '../../../utils/class-validator-decorators';
import { IsValidUsername } from '../../../utils/class-validator-decorators/username.decorator';

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

  @ApiProperty({ required: true, example: '2020-01-01' })
  @IsOptional()
  @IsDateString()
  @IsValidAge(13)
  dob: string;

  @ApiProperty({
    required: false,
    example: ['gaming', 'programming', 'backend'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  addedInterests: string[];

  @ApiProperty({
    required: false,
    example: ['programming'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  removedInterests: string[];
}
