import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { TagsService } from '../tags/tags.service';
import { getObjectDiff } from 'src/utils/diff.handler';
import { hashS10 } from 'src/utils/bcrypt';

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
    userData: user,
    updateUserDto: UpdateUserDto,
  ): Promise<user | null> {
    let { username, fname, lname, email, phoneNumber, image, interests } =
      updateUserDto;

    // updateUserDto['full_name'] = fname.trim() + ' ' + lname.trim();

    const user = await this.prismaService
      .$transaction(async (prisma) => {
        if (interests) {
          await this.tagsService.updateTagsForTables(
            interests,
            'user',
            userData.user_id,
          );
        }

        // const userDiff = getObjectDiff(updateUserDto, userData);
        username = username ? username : user.username;
        fname = fname ? fname : user.full_name.split(' ')[0];
        lname = lname ? lname : user.full_name.split(' ')[1];
        email = email ? email : user.email;
        phoneNumber = phoneNumber ? phoneNumber : user.phone_number;
        image = image ? image : user.image;
        let updatedUser;
        // if (userDiff) {
          updatedUser = await this.prismaService.user.update({
            where: { user_id: userData.user_id },
            data: {
              username: username,
              full_name: fname + ' ' + lname,
              email: email,
              phone_number: phoneNumber,
              image: image,
            },
          });
        // }

        return updatedUser;
      })
      .catch((error) => console.log(error));

    return user ? user : null;
  }

  async updatePassword(id, password) {
    const hashedPassword = await hashS10(password);
    await this.prismaService.user.update({
      where: { user_id: id },
      data: { password: hashedPassword },
    });
    return;
  }
}
