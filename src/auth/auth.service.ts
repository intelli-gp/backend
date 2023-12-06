import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import { encode } from 'src/utils/bcrypt';
import { MailsService } from 'src/mails/mails.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailsService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
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

    const tags = signUpDto.interests.map((tag) => ({
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
