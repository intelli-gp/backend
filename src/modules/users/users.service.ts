import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { encode } from 'src/utils/bcrypt';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tagsService: TagsService,
  ) {}

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
        const user = await prisma.user.findUnique({
          where: { user_id: id },
        });

        if (interests) {
          await this.tagsService.updateTagsForTables(interests, 'user', id);
        }

        username = username ? username : user.username;
        fname = fname ? fname : user.full_name.split(' ')[0];
        lname = lname ? lname : user.full_name.split(' ')[1];
        email = email ? email : user.email;
        phoneNumber = phoneNumber ? phoneNumber : user.phone_number;
        image = image ? image : user.image;

        const updatedUser = await this.prismaService.user.update({
          where: { user_id: id },
          data: {
            username,
            full_name: fname.trim() + ' ' + lname.trim(),
            email,
            phone_number: phoneNumber,
            image,
          },
        });

        return updatedUser;
      })
      .catch((error) => console.log(error));

    return user ? user : null;
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
