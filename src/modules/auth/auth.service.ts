import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './types/token.payload';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types/tokens';
import { user } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { compare, hashS10 } from 'src/utils/bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { MailsService } from '../mails/mails.service';
import { Profile } from 'passport-google-oauth20';
import { GooglePayload } from './types/google.payload';
import { Response } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { v4 as uuid } from 'uuid';
import { loginResult } from './types/login.response';
import { sendRefreshToken } from 'src/utils/response-handler/success.response-handler';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly mailService: MailsService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {}

  async issueAccessToken(payload: TokenPayload): Promise<string> {
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('ACCESS_TOKEN_EXPIRATION_TIME'),
      secret: this.config.get('ACCESS_TOKEN_SECRET'),
    });
    return accessToken;
  }

  async issueRefreshToken(payload: TokenPayload): Promise<string> {
    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('REFRESH_TOKEN_EXPIRATION_TIME'),
      secret: this.config.get('REFRESH_TOKEN_SECRET'),
    });
    return refreshToken;
  }

  async issueTokens(payload: TokenPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.issueAccessToken(payload),
      this.issueRefreshToken(payload),
    ]);
    await this.updateHashedRefreshToken(
      {
        userId: payload.userId,
        userEmail: payload.userEmail,
      },
      refreshToken,
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async updateHashedRefreshToken(
    payload: TokenPayload,
    refreshToken: string,
  ): Promise<user> {
    const hashedRefreshToken = await hashS10(refreshToken);
    return await this.prismaService.user.update({
      where: {
        user_id: payload.userId,
      },
      data: {
        hashed_refresh_token: hashedRefreshToken,
      },
    });
  }

  async validateRefreshToken(
    refreshToken: string,
    userId: number,
  ): Promise<user> {
    const user = await this.prismaService.user.findUnique({
      where: {
        user_id: userId,
      },
    });
    if (!user) throw new UnauthorizedException('unauthorized user');

    const isMatching = await compare(refreshToken, user.hashed_refresh_token);
    if (!isMatching) throw new UnauthorizedException('Action Denied');

    return user;
  }

  async validateGoogleUser(userProfile: Profile): Promise<GooglePayload> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: userProfile._json.email,
      },
      include: {
        user_tag: true,
        level: true,
        plan: true,
      },
    });
    if (user) return { user, state: 'login' };

    // TODO: discuss the plan and level assumption
    const incompleteUserData = {
      username: userProfile.displayName,
      full_name:
        userProfile._json.given_name + ' ' + userProfile._json.family_name,
      email: userProfile._json.email,
      points: 0,
      image: userProfile._json.picture,
    } as user;
    return { user: incompleteUserData, state: 'signup' };
  }

  async refreshTokens(refreshToken: string, userId: number): Promise<Tokens> {
    const user = await this.validateRefreshToken(refreshToken, userId);
    if (!user) throw new UnauthorizedException('Unauthorized User');
    const tokens = await this.issueTokens({
      userId: user.user_id,
      userEmail: user.email,
    });
    await this.updateHashedRefreshToken(
      {
        userId: user.user_id,
        userEmail: user.email,
      },
      tokens.refreshToken,
    );
    return tokens;
  }

  async loginLocal(loginDto: LoginDto): Promise<loginResult> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginDto.email,
      },
      include: {
        user_tag: true,
        level: true,
        plan: true,
      },
    });
    console.log(user);
    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const isMatching = await compare(loginDto.password, user.password);
    if (!isMatching && !(loginDto.password === user.password)) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const tokens = await this.issueTokens({
      userId: user.user_id,
      userEmail: user.email,
    });
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user,
    };
  }

  async logout(userId: number) {
    // TODO: remove from cookie as well
    await this.prismaService.user.updateMany({
      where: {
        user_id: userId,
        hashed_refresh_token: {
          not: null,
        },
      },
      data: {
        hashed_refresh_token: null,
      },
    });
    return true;
  }

  async googleLogin(userData: user, res: Response) {
    console.log('here in google callback');
    const { accessToken, refreshToken } = await this.issueTokens({
      userEmail: userData.email,
      userId: userData.user_id,
    });

    sendRefreshToken(res, refreshToken);

    res.redirect(
      this.config.get('FRONT_URL') +
        '#/auth/login/?token=' +
        accessToken +
        '&user=' +
        JSON.stringify(userData),
    );
  }

  async googleSignup(incompleteUserData: user, res: Response) {
    res.redirect(
      this.config.get('FRONT_URL') +
        '#/auth/signup/?userData=' +
        JSON.stringify(incompleteUserData),
    );
  }

  async googleRedirect(payloadData: GooglePayload, res: Response) {
    if (payloadData.state === 'login') {
      return await this.googleLogin(payloadData.user, res);
    } else if (payloadData.state === 'signup') {
      return await this.googleSignup(payloadData.user, res);
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<loginResult> {
    const password = await hashS10(signUpDto.password);
    const dob = new Date(signUpDto.dob);
    const renewal_date = new Date(
      new Date().setMonth(new Date().getMonth() + 1),
    );

    const userData = {
      password,
      full_name: signUpDto.fullName,
      renewal_date,
      username: signUpDto.username,
      email: signUpDto.email,
      phone_number: signUpDto.phoneNumber,
      dob,
      subscription_date: new Date(),
      level_id: 1,
      plan_id: 1,
    };
    const user = await this.prismaService.user.create({
      data: { ...userData },
      include: {
        user_tag: true,
        level: true,
        plan: true,
      },
    });
    await this.sendVerificationMail(user.username, user.email);
    const { accessToken, refreshToken } = await this.issueTokens({
      userId: user.user_id,
      userEmail: user.email,
    });
    return { accessToken, refreshToken, user };
  }

  async sendVerificationMail(username: string, email: string) {
    email
      ? email
      : (
          await this.prismaService.user.findUnique({
            where: { username },
          })
        ).email;

    if (email === null) return false;
    const randomUUID = uuid();

    this.cacheService.set(username, randomUUID, 15 * 60 * 1000);

    this.mailService.sendMail(email, 'Welcome to our website', 1, {
      username: username,
      token: randomUUID,
    });
  }

  private makeFullName(fname: string, lname: string) {
    return fname.trim() + ' ' + lname.trim();
  }

  async verify(username: string, token: string): Promise<boolean> {
    const cachedToken: string = await this.cacheService.get(username);

    if (!cachedToken || cachedToken !== token) return false;

    const user = await this.prismaService.user.update({
      where: { username },
      data: { active: true },
    });

    await this.cacheService.del(username);

    await this.mailService.sendMail(user.email, 'Welcome to our website', 3, {
      username: null,
      token: null,
    });
    return true;
  }

  async resetPassword(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    console.log(email);

    if (user) {
      const randomUUID = uuid();

      await this.cacheService.set(user.email, randomUUID, 15 * 60 * 1000);

      await this.mailService.sendMail(email, 'Reset your password', 2, {
        email,
        token: randomUUID,
      });

      return true;
    } else return false;
  }

  async resetPasswordConfirm(email: string, token: string, password: string) {
    const cachedToken: string = await this.cacheService.get(email);

    if (cachedToken === token) {
      await this.cacheService.del(email);

      const hashedPassword = await hashS10(password);

      const user = await this.prismaService.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      await this.mailService.sendMail(
        user.email,
        'Password changed successfully',
        4,
        { username: null, token: null },
      );

      return user;
    } else return null;
  }
}
