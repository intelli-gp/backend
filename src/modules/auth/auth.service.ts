import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import { encode } from 'src/utils/bcrypt';
import { MailsService } from 'src/modules/mails/mails.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailsService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const full_name = this.makeFullName(signUpDto.fname, signUpDto.lname);
    const password = await encode(signUpDto.password);
    const image = signUpDto.image ? new URL(signUpDto.image).toString() : null;
    const renewal_date = new Date(
      new Date().setMonth(new Date().getMonth() + 1),
    );

    const userData = {
      password,
      full_name,
      image,
      renewal_date,
      username: signUpDto.username,
      email: signUpDto.email,
      phone_number: signUpDto.phoneNumber,
      dob: new Date(signUpDto.dob),
      subscription_date: new Date(),
      level_id: 1,
      plan_id: 1,
    };

    const user = await this.prismaService.user.create({
      data: { ...userData },
    });

    const randomUUID = uuid();

    await this.cacheService.set(userData.username, randomUUID, 15 * 1000 * 60);

    await this.mailService.sendMail(
      userData.email,
      'Welcome to our website',
      1,
      {
        username: userData.username,
        token: randomUUID,
      },
    );

    return {
      message: 'We sent you a verification mail',
      data: user,
    };
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

  async resetPassword(username: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (user) {
      const randomUUID = uuid();

      await this.cacheService.set(user.username, randomUUID, 15 * 1000 * 60);

      await this.mailService.sendMail(user.email, 'Reset your password', 2, {
        username: user.username,
        token: randomUUID,
      });

      return true;
    } else return false;
  }

  async resetPasswordConfirm(
    username: string,
    token: string,
    password: string,
  ) {
    const cachedToken: string = await this.cacheService.get(username);

    if (cachedToken === token) {
      await this.cacheService.del(username);

      const hashedPassword = await encode(password);

      const user = await this.prismaService.user.update({
        where: { username },
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
