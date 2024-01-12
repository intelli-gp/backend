import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { TagsService } from '../tags/tags.service';
import { articles_content } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tagsService: TagsService,
  ) {}

  async createArticle(data: CreateArticleDto, userId: number) {
    const { title, coverImageUrl, tags, sections } = data;
    const sectionsPayload = sections.map(([value, content_type]) => ({
      value,
      content_type,
      created_at: new Date(),
    }));

    const addedArticle = await this.prismaService.article.create({
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
      include: {
        article_tag: true,
        user: true,
        articles_content: true,
      },
    });
    await this.tagsService.addTagsForEntities(
      tags,
      'article',
      addedArticle.article_id,
    );
    // TODO: Remove this line after adding tags to the response
    addedArticle.article_tag = tags
      .map((tag) => ({
        tag_name: tag,
        article_id: addedArticle.article_id,
      }))
      .filter((tag, index, self) => {
        return (
          index ===
          self.findIndex(
            (t) =>
              t.tag_name === tag.tag_name && t.article_id === tag.article_id,
          )
        );
      });
    return addedArticle;
  }
}
