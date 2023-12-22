import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private readonly prismaService: PrismaService) {}
  async updateInterests(
    interests: string[],
    tableName: 'user' | 'group' | 'course' | 'article' | 'ai_output',
    id: number,
  ) {
    const tags = interests.map((tag) => ({
      tag_name: tag.trim().toLowerCase(),
    }));

    await this.prismaService.tag.createMany({
      data: tags,
      skipDuplicates: true,
    });

    const userTags = tags.map((tag) => ({
      tag_name: tag.tag_name,
      [tableName + '_id']: id,
    }));

    await this.prismaService[tableName + '_tag'].createMany({
      data: userTags,
      skipDuplicates: true,
    });
  }
}
