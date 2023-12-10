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
  BadRequestException,
  UseFilters,
  NotFoundException,
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
import {
  BrokenLinkFilter,
  NotFoundFilter,
  PrismaFilter,
} from 'src/exception-filters/auth.filter';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @UseFilters(new PrismaFilter())
  async signUp(@Body() signUpDto: SignUpDto) {
    const data: any = await this.authService.signUp(signUpDto);
    if (data.user)
      return sendSuccessResponse({
        data: new SerializedUser(data.user),
      });
    else throw new BadRequestException(data);
  }

  @Get('send-verification/:username')
  async resendVerification(@Param('username') username: string) {
    await this.authService.sendVerificationMail(username, null);
    return sendSuccessResponse(null);
  }

  @Public()
  @Get('verify/:email/:token')
  @UseFilters(new BrokenLinkFilter())
  async verify(
    @Param('email') username: string,
    @Param('token') token: string,
  ) {
    const verified = await this.authService.verify(username, token);
    if (verified) return sendSuccessResponse(null);
    else throw new BadRequestException('broken link');
  }

  @Public()
  @Get('reset-password/:email')
  @UseFilters(new NotFoundFilter())
  async resetPassword(@Param('email') email: string) {
    const data = await this.authService.resetPassword(email);
    if (data) return sendSuccessResponse(null);
    throw new NotFoundException('email not found');
  }

  @Public()
  @Post('reset-password/:email/:token')
  @UseFilters(new BrokenLinkFilter())
  async resetPasswordConfirm(
    @Param('email') email: string,
    @Param('token') token: string,
    @Body('password') password: string,
  ) {
    const data = await this.authService.resetPasswordConfirm(
      email,
      token,
      password,
    );
    if (data)
      return sendSuccessResponse({
        data: new SerializedUser(data),
      });
    else throw new BadRequestException('broken link');
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
