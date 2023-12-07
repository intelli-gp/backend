import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import { encode } from 'src/utils/bcrypt';
import { MailsService } from 'src/mails/mails.service';
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
    if (
      await this.prismaService.user.findUnique({
        where: { username: signUpDto.username },
      })
    )
      return { message: 'Username already exists', data: null };

    const fullName = this.makeFullName(signUpDto.fname, signUpDto.lname);
    const password = await encode(signUpDto.password);
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

    const randomUUID = uuid();

    await this.cacheService.set(
      userData.username,
      { user: userData, token: randomUUID, interests: signUpDto.interests },
      15 * 1000 * 60,
    );

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
      data: userData.username,
    };
  }

  private makeFullName(fname: string, lname: string) {
    return fname.trim() + ' ' + lname.trim();
  }

  async verify(username: string, token: string) {
    const cachedData: any = await this.cacheService.get(username);

    if (!cachedData || cachedData.token !== token) return false;

    const userData = cachedData.user;

    const tags = cachedData.interests.map((tag) => ({
      name: tag.trim().toLowerCase(),
    }));

    const user = await this.prismaService
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
          'Welcome to our website',
          3,
          { username: null, token: null },
        );

        await this.cacheService.del(username);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });

    return user ? { user } : null;
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
