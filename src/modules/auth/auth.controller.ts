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
import { SerializedUser } from 'src/utils/serialized-types/serialized-user';
import { SignUpDto } from './dto/signup.dto';
import { GooglePayload } from './types/google.payload';
import { LinkedinGuard } from './guards/linkedin.guard';
import { ApiTags } from '@nestjs/swagger';
import { RtGuard } from './guards/refresh.jwt.guard';
// import { user } from '@prisma/client';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
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
