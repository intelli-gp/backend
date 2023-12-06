import { user as UserType } from '@prisma/client';
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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {
  sendRefreshToken,
  sendSuccessResponse,
} from 'src/utils/response.handler';
import { GetCurrentUser, Public } from './ParamDecortator';
import { GoogleGuard } from './guards/google.guard';
// import { user } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
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
    console.log('here');
    const tokens = await this.authService.loginLocal(loginDto);
    console.log('here2');

    sendRefreshToken(res, tokens.refreshToken);
    return sendSuccessResponse({ access_token: tokens.accessToken });
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
    @GetCurrentUser() user: UserType,
  ) {
    // TODO: do it correctly by logging in here
    console.log('here in google callback');
    const tokens = await this.authService.loginLocal({
      email: user.email,
      password: user.password,
    });
    console.log({ tokens });
    // TODO: redirect to front end server
    // redirect to front end with access token in url maybe hashed not return
    const frontendUrl = 'haha.com';

    // put the rt in token
    sendRefreshToken(res, tokens.refreshToken);
    return sendSuccessResponse({
      access_token: tokens.accessToken,
      url: frontendUrl,
    });
  }
}
