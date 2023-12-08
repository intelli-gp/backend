import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  Get,
  UseGuards,
  HttpStatus,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {
  sendRefreshToken,
  sendSuccessResponse,
} from 'src/utils/response.handler';
import { GetCurrentUser, Public } from './ParamDecorator';
import { GoogleGuard } from './guards/google.guard';
import { SerializedUser } from 'src/utils/serialized-types/serialized-user';
import { SignUpDto } from './dto/signup.dto';
import { GooglePayload } from './types/google.payload';
import { LinkedinGuard } from './guards/linkedin.guard';
import { ApiTags } from '@nestjs/swagger';
import { RtGuard } from './guards/refresh.jwt.guard';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
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

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  async refresh(
    @Req() req,
    @Res({ passthrough: true }) res,
    @GetCurrentUser('user_id') userId,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    const tokens = await this.authService.refreshTokens(refreshToken, userId);
    sendRefreshToken(res, tokens.refreshToken);
    return sendSuccessResponse({ access_token: tokens.accessToken });
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Res({ passthrough: true }) res, @Body() loginDto: LoginDto) {
    const { tokens, user } = await this.authService.loginLocal(loginDto);

    sendRefreshToken(res, tokens.refreshToken);
    return sendSuccessResponse({
      access_token: tokens.accessToken,
      user: new SerializedUser(user),
    });
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res, @GetCurrentUser('user_id') userId) {
    res.clearCookie('refresh_token');
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(GoogleGuard)
  @Get('login/google')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleGuard)
  @Get('google/callback')
  async googleCallback(
    @Res({ passthrough: true }) res,
    @GetCurrentUser() user: GooglePayload,
  ) {
    await this.authService.googleRedirect(user, res);
  }

  @Public()
  @UseGuards(LinkedinGuard)
  @Get('login/linkedin')
  linkedinLogin() {}

  @Public()
  @UseGuards(LinkedinGuard)
  @Get('linkedin/callback')
  async linkedinCallback() {
    return 'linkedin login ';
  }
}
