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
    if (data.data)
      return {
        message: 'We sent you a verification mail',
        data: new SerializedUser(data.data),
      };
    else return { message: data.message, data: null };
  }

  @Get('verify/:username/:token')
  async verify(
    @Param('username') username: string,
    @Param('token') token: string,
  ) {
    const verified = await this.authService.verify(username, token);
    if (verified)
      return {
        message: 'We sent you a verification mail',
      };
    else
      return {
        message: 'something went wrong',
      };
  }

  @Get('reset-password/:username')
  async resetPassword(@Param('username') username: string) {
    const data = await this.authService.resetPassword(username);
    if (data)
      return {
        message: 'We sent you a mail press the link there',
      };
    else return { message: 'something went wrong' };
  }

  @Post('reset-password/:username/:token')
  async resetPasswordConfirm(
    @Param('username') username: string,
    @Param('token') token: string,
    @Body('password') password: string,
  ) {
    const data = await this.authService.resetPasswordConfirm(
      username,
      token,
      password,
    );
    if (data)
      return {
        message: 'Password changed successfully',
        data: new SerializedUser(data),
      };
    else return { message: 'something went wrong' };
  }
}
