import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SerializedUser } from 'src/utils/serialized-types/serialized-user';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const data = (await this.authService.signUp(signUpDto)).data;

    if (data)
      return {
        message: 'We sent you a verification mail',
        data: new SerializedUser(data),
      };
    else
      return {
        message: 'something went wrong',
        data,
      };
  }
}
