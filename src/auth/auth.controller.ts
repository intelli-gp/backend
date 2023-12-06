import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
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

  @Get('test')
  async test() {
    return 'hello';
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const data = await this.authService.signUp(signUpDto);

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

  @Get('verify/:username/:token')
  async verify(
    @Param('username') username: string,
    @Param('token') token: string,
  ) {
    if (this.authService.verify(username, token)) return { message: 'ok' };
    return { message: 'not ok' };
  }
}
