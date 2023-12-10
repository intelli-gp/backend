import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<user[] | null> {
    return await this.prisma.user.findMany();
  }

  async getUserByUsername(username: string): Promise<user | null> {
    return await this.prisma.user.findUnique({ where: { username: username } });
  }

  async getUserById(id: number): Promise<user | null> {
    return await this.prisma.user.findUnique({ where: { user_id: id } });
  }
}
