import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './types/token.payload';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types/tokens';
import { user } from '@prisma/client';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async hashS10(value: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(value, salt);
  }

  async issueAccessToken(payload: TokenPayload): Promise<string> {
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('ACCESS_TOKEN_SECRET'),
    });
    return accessToken;
  }

  async issueRefreshToken(payload: TokenPayload): Promise<string> {
    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('ACCESS_TOKEN_SECRET'),
    });
    return refreshToken;
  }
  async issueTokens(payload: TokenPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.issueAccessToken(payload),
      this.issueRefreshToken(payload),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async updateHashedRefreshToken(
    payload: TokenPayload,
    refreshToken: string,
  ): Promise<user> {
    const hashedRefreshToken = await this.hashS10(refreshToken);
    return await this.prisma.user.update({
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
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });
    if (!user) throw new ForbiddenException('Access Denied');

    const isMatching = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );
    if (!isMatching) throw new ForbiddenException('Access Denied');

    return user;
  }
  async refreshTokens(refreshToken: string, userId: number): Promise<Tokens> {
    const user = await this.validateRefreshToken(refreshToken, userId);
    if (!user) throw new ForbiddenException('Access Denied');
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

  async loginLocal(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });
    if (!user) throw new ForbiddenException('Access Denied');

    const isMatching = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatching) throw new ForbiddenException('Access Denied');

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

  async logout(userId: number) {
    // TODO: remove from cookie as well
    await this.prisma.user.updateMany({
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

  async googleLogin() {
    // TODO: implement
  }
}
