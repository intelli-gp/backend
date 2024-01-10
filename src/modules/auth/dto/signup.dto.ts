import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
} from 'class-validator';
import { ToLowerCase } from 'src/utils/class-transformer-decorators/lowercase-transformer.decorator';
import {
  IsValidAge,
  IsGteZero,
  IsStrongPassword,
  IsValidUsername,
} from 'src/utils/class-validator-decorators';

export class SignUpDto {
  @ApiProperty({ required: true, example: 'John32' })
  @IsNotEmpty()
  @IsValidUsername()
  username: string;

  @ApiProperty({ required: true, example: 'John' })
  @IsNotEmpty()
  @Length(3, 50)
  fullName: string;

  @ApiProperty({ required: true, example: 'johndoe@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @ToLowerCase()
  email: string;

  @ApiProperty({ required: true, example: 'Testpassword@1234' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ required: true, example: '+xx1050790880' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ required: true, example: '2020-01-01' })
  @IsNotEmpty()
  @IsDateString()
  @IsValidAge(13)
  dob: string;
}
