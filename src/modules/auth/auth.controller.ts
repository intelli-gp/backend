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
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {
  sendRefreshToken,
  sendSuccessResponse,
} from 'src/utils/response-handler/success.response-handler';
import { GetCurrentUser, Public } from './ParamDecorator';
import { GoogleGuard } from './guards/google.guard';
import { SerializedUser } from 'src/modules/users/serialized-types/serialized-user';
import { SignUpDto } from './dto/signup.dto';
import { GooglePayload } from './types/google.payload';
import { LinkedinGuard } from './guards/linkedin.guard';
import { ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RtGuard } from './guards/refresh.jwt.guard';
import { loginResult } from './types/login.response';
import { ConfigService } from '@nestjs/config';
import {
  ResetPasswordDto,
  VerifyUserDto,
  ResetPasswordConfirmationParamDto,
  ResetPasswordConfirmationBodyDto,
} from './dto';
import { swaggerSuccessExample } from 'src/utils/swagger/example-generator';
import { SwaggerLoginExample, SwaggerRefreshExample } from './swagger-examples';
import { SwaggerFailureResponseExample } from 'src/common/swagger-examples/failure.example';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    schema: SwaggerFailureResponseExample({
      errorMessage: 'unique constraint failed',
      errorTarget: 'username',
    }),
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User Created',
    schema: swaggerSuccessExample(SwaggerLoginExample),
  })
  async signUp(@Res({ passthrough: true }) res, @Body() signUpDto: SignUpDto) {
    const data: loginResult = await this.authService.signUp(signUpDto);
    sendRefreshToken(res, data.refreshToken);
    return sendSuccessResponse({
      user: new SerializedUser(data.user),
      access_token: data.accessToken,
    });
  }

  @Get('send-verification/:username')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Verification Mail Sent',
  })
  async resendVerification(@Param('username') username: string) {
    await this.authService.sendVerificationMail(username, null);
    return sendSuccessResponse(null);
  }

  @Public()
  @Get('verify/:username/:token')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User Verified',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Broken Link',
    schema: SwaggerFailureResponseExample({
      errorMessage: 'broken link',
    }),
  })
  async verify(
    @Res({ passthrough: true }) res,
    @Param() verificationData: VerifyUserDto,
  ) {
    const verified = await this.authService.verify(
      verificationData.username,
      verificationData.token,
    );
    if (verified) return res.redirect(this.config.get('FRONT_URL') + '#/app');
    throw new BadRequestException('broken link');
  }

  @Public()
  @Get('reset-password/:email')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reset Password Mail Sent',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Email Not Found',
    schema: SwaggerFailureResponseExample({
      errorMessage: 'email not found',
    }),
  })
  async resetPassword(@Param() resetData: ResetPasswordDto) {
    const data = await this.authService.resetPassword(resetData.email);
    if (data) return sendSuccessResponse(null);
    throw new NotFoundException('email not found');
  }

  @Public()
  @Post('reset-password/:email/:token')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password Reset Successful',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Broken Link',
    schema: SwaggerFailureResponseExample({
      errorMessage: 'broken link',
    }),
  })
  async resetPasswordConfirm(
    @Param() confirmationParamData: ResetPasswordConfirmationParamDto,
    @Body() confirmationBodyData: ResetPasswordConfirmationBodyDto,
  ) {
    const data = await this.authService.resetPasswordConfirm(
      confirmationParamData.email,
      confirmationParamData.token,
      confirmationBodyData.password,
    );
    if (data) return sendSuccessResponse({});
    throw new BadRequestException('broken link');
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Refresh Token Generated',
    schema: swaggerSuccessExample(SwaggerRefreshExample),
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid Refresh Token',
    schema: SwaggerFailureResponseExample({
      errorMessage: 'invalid refresh token',
    }),
  })
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login Successful',
    schema: swaggerSuccessExample(SwaggerLoginExample),
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid Credentials',
    schema: SwaggerFailureResponseExample({
      errorMessage: 'invalid credentials',
    }),
  })
  async login(@Res({ passthrough: true }) res, @Body() loginDto: LoginDto) {
    const { accessToken, refreshToken, user } =
      await this.authService.loginLocal(loginDto);

    sendRefreshToken(res, refreshToken);
    return sendSuccessResponse({
      user: new SerializedUser(user),
      access_token: accessToken,
    });
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logout Successful',
  })
  logout(@Res({ passthrough: true }) res, @GetCurrentUser('user_id') userId) {
    res.clearCookie('refresh_token');
    return sendSuccessResponse(this.authService.logout(userId));
  }

  @ApiExcludeEndpoint()
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

  @ApiExcludeEndpoint()
  @Public()
  @UseGuards(LinkedinGuard)
  @Get('login/linkedin')
  linkedinLogin() {}

  @ApiExcludeEndpoint()
  @Public()
  @UseGuards(LinkedinGuard)
  @Get('linkedin/callback')
  async linkedinCallback() {
    return 'linkedin login ';
  }
}
