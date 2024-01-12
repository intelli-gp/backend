import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { articles_content } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createArticle(data: CreateArticleDto, userId: number) {
    const { title, coverImageUrl, tags, sections } = data;
    const sectionsPayload = sections.map(([value, content_type]) => ({
      value,
      content_type,
      created_at: new Date(),
    }));
    await this.prismaService.article.create({
      data: {
        title,
        cover_image_url: coverImageUrl,
        user_id: userId,
        created_at: new Date(),
        articles_content: {
          createMany: {
            data: sectionsPayload,
          },
        },
      },
    });
    return true;
  }
}
