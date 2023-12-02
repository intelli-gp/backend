import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import { encode } from 'src/utils/bcrypt';
import { connect } from 'http2';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

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

    const tags = signUpDto.interests.map((tag) => ({ name: tag }));
    const user = await this.prisma.user.create({ data: { ...userData } });
    const upsertTags = tags.map(
      async (tag) =>
        await this.prisma.tag.upsert({
          where: { name: tag.name },
          create: tag,
          update: {},
        }),
    );
    await Promise.all(upsertTags);

    const userTags = await tags.map(async (tag) => ({
      tag_id: (await this.prisma.tag.findFirst({ where: { name: tag.name } }))
        .tag_id,
      user_id: user.user_id,
    }));

    await this.prisma.user_tag.createMany({
      data: await Promise.all(userTags),
    });

    return user;
  }

  private makeFullName(fname: string, lname: string) {
    return fname.trim() + ' ' + lname.trim();
  }
}
