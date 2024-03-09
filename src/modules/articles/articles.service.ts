import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { TagsService } from '../tags/tags.service';
import { articles_content } from '@prisma/client';
import { UpdateArticleDto } from './dto';
import { SerializedArticle } from './serialized-types/article.serialized';
import { DeserializedArticle } from './serialized-types/article.deserializer';
import { PaginationDto } from 'src/common/dto';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tagsService: TagsService,
  ) {}

  // TODO: Temporary
  async getAllArticles(paginationData: PaginationDto) {
    const articles = await this.prismaService.article.findMany({
      take: paginationData.limit,
      skip: paginationData.offset,
      include: {
        article_tag: true,
        user: {
          include: {
            followed_by: true,
          },
        },
        articles_content: true,
      },
    });
    return articles;
  }
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

  async getArticle(articleId: number) {
    const article = await this.prismaService.article.findUnique({
      where: {
        article_id: articleId,
      },
      include: {
        article_tag: true,
        user: true,
        articles_content: true,
      },
    });

    if (!article) throw new NotFoundException('Article not found');

    return article;
  }

  async updateArticle(
    articleData: UpdateArticleDto,
    articleId: number,
    userId: number,
  ) {
    if (!articleData) throw new BadRequestException('No update data provided');

    const { addedTags, removedTags, ...restOfData } = articleData;
    const deserializedArticle = new DeserializedArticle(restOfData);

    const { articles_content, ...articleMainData } = deserializedArticle;

    const updatedArticle = await this.prismaService.$transaction(
      async (prisma) => {
        Logger.debug('Updating article');
        // Repopulate the sections of the articles with new data
        // TODO: Clean up
        if (articles_content) {
          await prisma.articles_content.deleteMany({
            where: {
              article_id: articleId,
            },
          });

          await prisma.articles_content.createMany({
            data: articles_content.map(([value, content_type]) => ({
              article_id: articleId,
              value,
              content_type,
            })),
          });
        }
        if (addedTags?.length || removedTags?.length) {
          // TODO: Not included in the transaction
          await this.tagsService.updateTagsForEntities(
            addedTags,
            removedTags,
            'article',
            articleId,
          );
        }
        if (articleMainData) {
          return await prisma.article.update({
            where: {
              article_id: articleId,
              user_id: userId,
            },
            data: {
              ...articleMainData,
            },
            include: {
              article_tag: true,
              user: true,
              articles_content: true,
            },
          });
        } else {
          return await prisma.article.findUnique({
            where: {
              article_id: articleId,
            },
            include: {
              article_tag: true,
              user: true,
              articles_content: true,
            },
          });
        }
      },
    );
    return updatedArticle;
  }
  async deleteArticle(articleId: number, userId: number) {
    await this.prismaService.article.delete({
      where: {
        article_id: articleId,
        user_id: userId,
      },
    });
    return true;
  }
}
