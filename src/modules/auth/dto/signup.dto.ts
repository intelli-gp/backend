import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Matches,
  MinLength,
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
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
  )
  password: string;

  @ApiProperty({ required: true, example: '+xx1050790880' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ required: true, example: '2020-01-01' })
  @IsNotEmpty()
  @IsDateString()
  dob: string;

  @ApiProperty({ required: true, example: 'https://image.com' })
  image: string;
}
