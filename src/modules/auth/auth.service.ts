import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './types/token.payload';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types/tokens';
import { user } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { hashS10 } from 'src/utils/bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { MailsService } from '../mails/mails.service';
import { Profile } from 'passport-google-oauth20';
// import { Profile } from 'passport-google-oauth20';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly mailService: MailsService,
  ) {}

  async issueAccessToken(payload: TokenPayload): Promise<string> {
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('ACCESS_TOKEN_SECRET'),
    });
    return accessToken;
  }

  async issueRefreshToken(payload: TokenPayload): Promise<string> {
    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: this.config.get('REFRESH_TOKEN_SECRET'),
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
    const hashedRefreshToken = await hashS10(refreshToken);
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

  async validateGoogleUser(userProfile: Profile): Promise<user> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userProfile._json.email,
      },
    });
    if (user) return user;

    // TODO: discuss the plan and level assumption
    return await this.prisma.user.create({
      data: {
        username: userProfile.displayName,
        email: userProfile._json.email,
        password: await hashS10(crypto.randomUUID()),
        dob: null,
        points: 0,
        phone_number: null,
        image: userProfile._json.profile,
        level_id: 1,
        plan_id: 1,
        renewal_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        subscription_date: new Date(),
      } as user,
    });
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
    console.log(user);
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

  async googleRedirect() {
    // TODO: implement
  }

  async signUp(signUpDto: SignUpDto) {
    const fullName = this.makeFullName(signUpDto.fname, signUpDto.lname);
    const password = await hashS10(signUpDto.password);
    const renewal_date = new Date(
      new Date().setMonth(new Date().getMonth() + 1),
    );

    const userData = {
      password,
      full_name: fullName,
      username: signUpDto.username,
      email: signUpDto.email,
      phone_number: signUpDto.phoneNumber,
      dob: new Date(signUpDto.dob),
      image_url: signUpDto.image,
      renewal_date: renewal_date,
      subscription_date: new Date(),
      level_id: 1,
      plan_id: 1,
    };

    const tags = signUpDto.interests.map((tag) => ({
      name: tag.trim().toLowerCase(),
    }));

    const user = await this.prisma
      .$transaction(async (prisma) => {
        const user = await prisma.user.create({
          data: { ...userData },
        });

        await prisma.tag.createMany({
          data: tags,
          skipDuplicates: true,
        });

        const userTags = await tags.map(async (tag) => ({
          tag_id: (await prisma.tag.findFirst({ where: { name: tag.name } }))
            .tag_id,
          user_id: user.user_id,
        }));

        await prisma.user_tag.createMany({
          data: await Promise.all(userTags),
        });

        await this.mailService.sendMail(
          user.email,
          'Welcome',
          'Welcome to our website',
        );

        return user;
      })
      .catch((err) => {});

    if (user) {
      return { message: 'We sent you a verification mail', data: user };
    } else {
      return { message: 'something went wrong', data: null };
    }
  }

  private makeFullName(fname: string, lname: string) {
    return fname.trim() + ' ' + lname.trim();
  }
}
