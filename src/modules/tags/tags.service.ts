import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { tag } from '@prisma/client';
import { PaginationDto } from 'src/common/dto';
@Injectable()
export class TagsService {
  constructor(private readonly prismaService: PrismaService) {}
  async updateTagsForTables(
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

  async getAllTags(paginationData?: PaginationDto) {
    const { limit, offset } = paginationData;
    const tags = await this.prismaService.tag.findMany({
      take: limit,
      skip: offset,
    });
    return tags.map((tag) => tag.tag_name);
  }

  async getSuggestedTags(paginationData?: PaginationDto) {
    const userTags = await this.prismaService.user_tag.findMany({});
    // I want to map these user tags to get the most frequent tags
    const tagFrequency = userTags.reduce((acc, cur) => {
      if (cur.tag_name in acc) {
        acc[cur.tag_name]++;
      } else {
        acc[cur.tag_name] = 1;
      }
      return acc;
    }, {});
    const tagFrequencyArray = Object.entries(tagFrequency).map(
      ([tag_name, frequency]) => ({ tag_name, frequency }),
    );

    const sortedTagFrequencyArray = tagFrequencyArray.sort(
      (a, b) => Number(a.frequency) - Number(b.frequency),
    );

    const firstNtags = sortedTagFrequencyArray
      .slice(0, paginationData.limit)
      .map((tag) => tag.tag_name);

    return firstNtags;
  }
}
