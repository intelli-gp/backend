import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({ required: true, example: 'John32' })
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @ApiProperty({ required: true, example: 'John' })
  @IsNotEmpty()
  @MinLength(3)
  fname: string;

  @ApiProperty({ required: true, example: 'Doe' })
  @IsNotEmpty()
  @MinLength(3)
  lname: string;

  @ApiProperty({ required: true, example: 'johndoe@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, example: 'Testpassword@1234' })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ required: true, example: '+xx1050790880' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ required: true, example: '2020-01-01' })
  @IsNotEmpty()
  @IsDate()
  dob: Date;

  @ApiProperty({ required: true, example: 'https://image.com' })
  @IsUrl()
  image: string;

  @ApiProperty({ required: true, example: ['interest1', 'interest2'] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @IsString({ each: true })
  interests: string[];
}
