import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { TagsService } from '../tags/tags.service';
import { hashS10 } from '../../utils/bcrypt';
import { PaginationDto } from 'src/common/dto';

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
    const {
      username,
      fullName,
      email,
      phoneNumber,
      bio,
      image,
      coverImage,
      interests,
    } = updateUserDto;

    // updateUserDto['full_name'] = fname.trim() + ' ' + lname.trim();

    const user = await this.prismaService.$transaction(async () => {
      if (interests) {
        await this.tagsService.updateTagsForTables(
          interests,
          'user',
          userData.user_id,
        );
      }

      // const userDiff = getObjectDiff(updateUserDto, userData);
      const userDataInput = {};
      userDataInput['username'] = username ? username : userData.username;
      userDataInput['full_name'] = fullName ? fullName : userData.full_name;
      userDataInput['email'] = email ? email : userData.email;
      userDataInput['phone_number'] = phoneNumber
        ? phoneNumber
        : userData.phone_number;
      userDataInput['image'] = image ? image : userData.image;
      userDataInput['cover_image'] = coverImage
        ? coverImage
        : userData.cover_image;
      userDataInput['bio'] = bio ? bio : userData.bio;
      // if (userDiff) {
      const updatedUser = await this.prismaService.user.update({
        where: { user_id: userData.user_id },
        data: {
          ...userDataInput,
        },
        include: {
          user_tag: true,
          level: true,
          plan: true,
        },
      });
      // }

      return updatedUser;
    });

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

  async getRecommendedUsers() {
    return true;
  }
  async getUserFollowers() {
    return true;
  }

  async getUserFollowing() {
    return true;
  }

  async followUser() {
    return;
  }

  async unfollowUser() {
    return;
  }
}
