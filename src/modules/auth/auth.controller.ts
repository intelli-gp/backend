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
    Param,
    BadRequestException,
    NotFoundException,
    Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {
    sendRefreshToken,
    sendSuccessResponse,
} from 'src/utils/response-handler/success.response-handler';
import {
    GetCurrentUser,
    GetFromCookie,
    Public,
    SecondFactorPublic,
} from './ParamDecorator';
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
import { user } from '@prisma/client';
import { OtpDto } from './dto/otp.dto';
import { SecondFactorRtGuard } from './guards/2fa-refresh.jwt.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    constructor(
        private readonly authService: AuthService,
        private readonly config: ConfigService,
    ) {}

    @Public()
    @SecondFactorPublic()
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
    async signUp(
        @Res({ passthrough: true }) res,
        @Body() signUpDto: SignUpDto,
    ) {
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
    @SecondFactorPublic()
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
        if (verified)
            return res.redirect(this.config.get('FRONT_URL') + '/app');
        throw new BadRequestException('broken link');
    }

    @Public()
    @SecondFactorPublic()
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
    @SecondFactorPublic()
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

    @Post('refresh')
    @Public()
    @SecondFactorPublic()
    @UseGuards(RtGuard, SecondFactorRtGuard)
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
        @GetFromCookie('refresh_token') rt: string,
        @GetCurrentUser() user: user,
        @Res({ passthrough: true }) res: Response,
    ) {
        const tokens = await this.authService.refreshTokens(rt, user);
        sendRefreshToken(res, tokens.refreshToken);
        return sendSuccessResponse({ access_token: tokens.accessToken });
    }

    @Public()
    @SecondFactorPublic()
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
    @SecondFactorPublic()
    @UseGuards(GoogleGuard)
    @Get('login/google')
    googleLogin() {}

    @Public()
    @SecondFactorPublic()
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
    @SecondFactorPublic()
    @UseGuards(LinkedinGuard)
    @Get('login/linkedin')
    linkedinLogin() {}

    @ApiExcludeEndpoint()
    @Public()
    @SecondFactorPublic()
    @UseGuards(LinkedinGuard)
    @Get('linkedin/callback')
    async linkedinCallback() {
        return 'linkedin login ';
    }

    // 2FA

    @SecondFactorPublic()
    @Get('2fa/generate')
    async register(
        @Res() response: Response,
        @GetCurrentUser() currentUser: user,
    ) {
        const { otpAuthUrl } =
            await this.authService.generateTwoFactorAuthenticationSecret(
                currentUser,
            );

        return this.authService.pipeQrCodeStream(response, otpAuthUrl);
    }

    @SecondFactorPublic()
    @Post('2fa/authenticate')
    async authenticate(
        @Body() otpData: OtpDto,
        @GetCurrentUser() currentUser: user,
        @Res({
            passthrough: true,
        })
        response: Response,
    ) {
        const tokens = await this.authService.authenticateSecondFactorForUser(
            otpData.otp,
            currentUser,
        );

        sendRefreshToken(response, tokens.refreshToken);
        return sendSuccessResponse({
            access_token: tokens.accessToken,
        });
    }

    @SecondFactorPublic()
    @Post('2fa/enable')
    async enableTwoFactorAuthenticationForUser(
        @Body() otpData: OtpDto,
        @GetCurrentUser() currentUser: user,
        @Res({
            passthrough: true,
        })
        response: Response,
    ) {
        const tokens =
            await this.authService.enableSecondFactorAuthenticationForUser(
                otpData.otp,
                currentUser,
            );
        sendRefreshToken(response, tokens.refreshToken);
        return sendSuccessResponse({
            access_token: tokens.accessToken,
        });
    }

    @Post('2fa/disable')
    async disableTwoFactorAuthenticationForUser(
        @Body() otpData: OtpDto,
        @GetCurrentUser() currentUser: user,
        @Res({
            passthrough: true,
        })
        response: Response,
    ) {
        const tokens =
            await this.authService.disableSecondFactorAuthenticationForUser(
                otpData.otp,
                currentUser,
            );
        sendRefreshToken(response, tokens.refreshToken);
        return sendSuccessResponse({
            access_token: tokens.accessToken,
        });
    }
}
