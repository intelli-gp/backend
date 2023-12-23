import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsUrl,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { IsStrongPassword } from 'src/utils/class-validator-decorators/password.decorator';
import { IsValidUsername } from 'src/utils/class-validator-decorators/username.decorator';

export class SignUpDto {
  @ApiProperty({ required: true, example: 'John32' })
  @IsNotEmpty()
  @IsValidUsername()
  username: string;

  @ApiProperty({ required: true, example: 'John' })
  @IsNotEmpty()
  @Length(3, 20)
  fname: string;

  @ApiProperty({ required: true, example: 'Doe' })
  @IsNotEmpty()
  @Length(3, 20)
  lname: string;

  @ApiProperty({ required: true, example: 'johndoe@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
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
