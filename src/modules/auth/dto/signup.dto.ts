import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
} from 'class-validator';
import { ToLowerCase } from 'src/utils/class-transformer-decorators/lowercase-transformer.decorator';
import { IsStrongPassword } from 'src/utils/class-validator-decorators/password.decorator';
import { IsValidUsername } from 'src/utils/class-validator-decorators/username.decorator';

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
  dob: string;
}
