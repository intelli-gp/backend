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
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @MinLength(3)
  fname: string;

  @IsNotEmpty()
  @MinLength(3)
  lname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsNotEmpty()
  @IsDate()
  dob: Date;

  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @IsString({ each: true })
  interests: string[];
}
