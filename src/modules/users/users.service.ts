import { BadRequestException, Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { encode } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(): Promise<user[] | null> {
    return await this.prismaService.user.findMany();
  }

  async getUserByUsername(username: string): Promise<user | null> {
    return await this.prismaService.user.findUnique({
      where: { username: username },
    });
  }

  async getUserById(id: number): Promise<user | null> {
    return await this.prismaService.user.findUnique({ where: { user_id: id } });
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<user | null> {
    let { username, fname, lname, email, phoneNumber, image, interests } =
      updateUserDto;

    const user = await this.prismaService
      .$transaction(async (prisma) => {
        const userr = await prisma.user.findUnique({
          where: { user_id: id },
        });

        if (interests) {
          const tags = updateUserDto.interests.map((tag) => ({
            name: tag.trim().toLowerCase(),
          }));

          await prisma.tag.createMany({
            data: tags,
            skipDuplicates: true,
          });

          const userTags = await tags.map(async (tag) => ({
            tag_id: (await prisma.tag.findFirst({ where: { name: tag.name } }))
              .tag_id,
            user_id: id,
          }));
          const x = await Promise.all(userTags);
          await prisma.user_tag.createMany({
            data: x,
            skipDuplicates: true,
          });
        }

        username = username ? username : userr.username;
        fname = fname ? fname : userr.full_name.split(' ')[0];
        lname = lname ? lname : userr.full_name.split(' ')[1];
        email = email ? email : userr.email;
        phoneNumber = phoneNumber ? phoneNumber : userr.phone_number;
        image = image ? image : userr.image;

        const updatedUser = await this.prismaService.user.update({
          where: { username: username },
          data: {
            full_name: fname.trim() + ' ' + lname.trim(),
            email,
            phone_number: phoneNumber,
            image,
          },
        });

        return updatedUser;
      })
      .catch((error) => console.log(error));

    if (user) return user;
    return null;
  }

  async updatePassword(id, password) {
    const hashedPassword = await encode(password);
    await this.prismaService.user.update({
      where: { user_id: id },
      data: { password: hashedPassword },
    });
    return;
  }
}
