import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './modules/prisma/prisma.service';
import { resolve } from 'path';
import { readFileSync, existsSync, rmSync } from 'fs';
import { Prisma } from '@prisma/client';
import { extractDirectory } from './utils/zip';

@Injectable()
export class DbInitializationService {
  private readonly DbInitializationLogger = new Logger(
    DbInitializationService.name,
  );
  constructor(private readonly prisma: PrismaService) {}

  async resetData() {
    await this.prisma.user_tag.deleteMany({});
    await this.prisma.article_tag.deleteMany({});
    await this.prisma.articles_content.deleteMany({});
    await this.prisma.article.deleteMany({});
    await this.prisma.user.deleteMany({});
    await this.prisma.level.deleteMany({});
    await this.prisma.plan.deleteMany({});
    await this.prisma.tag.deleteMany({});
  }
  async extractInitializationData() {
    this.DbInitializationLogger.log('Extracting data');
    try {
      if (!existsSync(resolve(__dirname, '..', 'src', 'initialization-data'))) {
        throw new Error('Old Data not found');
      }
      rmSync(resolve(__dirname, '..', 'src', 'initialization-data'), {
        recursive: true,
      });
      this.DbInitializationLogger.log('Data deleted');
    } catch (_) {
      this.DbInitializationLogger.error('Data to delete not found');
    }

    try {
      if (
        !existsSync(resolve(__dirname, '..', 'src', 'initialization-data.zip'))
      ) {
        throw new Error('zip file not found');
      }
      extractDirectory(
        resolve(__dirname, '..', 'src', 'initialization-data.zip'),
        resolve(__dirname, '..', 'src'),
      );
    } catch (error) {
      this.DbInitializationLogger.error('Data to extract not found');
      this.DbInitializationLogger.error(error);
    }

    this.DbInitializationLogger.log('Data extracted');
  }

  deleteInitialExtractedData() {
    rmSync(resolve(__dirname, '..', 'src', 'initialization-data'), {
      recursive: true,
    });
    this.DbInitializationLogger.log('Extracted Data Cleaned');
  }
  async init() {
    this.DbInitializationLogger.log('Initializing data');
    const planCount = await this.prisma.plan.count();
    if (planCount === 0) {
      await this.extractInitializationData();
      await this.migrateData();
      this.deleteInitialExtractedData();
    }
  }

  async migrateData() {
    this.DbInitializationLogger.log('Migrating data');
    await this.migratePlans();
    await this.migrateLevels();
    await this.migrateTags();
    await this.migrateGeneratedUsers();
    await this.migrateArticles();
  }

  async migratePlans() {
    await this.prisma.plan.create({
      data: {
        plan_id: 1,
        title: 'Default Plan',
        description: 'This is the default plan',
        trial_period: 'infinity',
        billing_frequency: 0,
        price: 0,
        currency: 'EGP',
        image_url: 'www.google.com',
      },
    });
  }

  async migrateLevels() {
    await this.prisma.level.upsert({
      where: { level_id: 1 },
      update: {},
      create: {
        level_id: 1,
        title: 'Beginner',
        description: 'This is the beginner level',
        image_url: 'www.google.com',
      },
    });
  }

  async migrateTags() {
    const pathForTags = resolve(
      __dirname,
      '..',
      'src',
      'initialization-data',
      'tags.json',
    );
    const tags = JSON.parse(readFileSync(pathForTags, 'utf-8'));
    const tagCreateManyInput = tags.map((tag: string) => ({
      tag_name: tag,
    })) as Prisma.tagCreateManyInput;

    this.DbInitializationLogger.log('Migrating tags');
    this.DbInitializationLogger.log(tags.length);

    await this.prisma.tag.createMany({
      data: tagCreateManyInput,
      skipDuplicates: true,
    });

    this.DbInitializationLogger.log('Tags added');
  }

  async migrateGeneratedUsers() {
    const pathForUsers = resolve(
      __dirname,
      '..',
      'src',
      'initialization-data',
      'users.json',
    );
    const generatedUsers = JSON.parse(readFileSync(pathForUsers, 'utf-8'));
    const generatedUsersWithoutTags = generatedUsers.map((user) => {
      const { tags, user_id, ...rest } = user;
      return rest;
    });

    this.DbInitializationLogger.log('Migrating users');
    this.DbInitializationLogger.log(generatedUsersWithoutTags.length);

    await this.prisma.user.createMany({
      data: generatedUsersWithoutTags,
      skipDuplicates: true,
    });
    for (const user of generatedUsers) {
      await this.prisma.user.update({
        where: {
          username: user.username,
        },
        data: {
          user_tag: {
            createMany: {
              data: user.tags.map((tag: string) => ({
                tag_name: tag,
              })),
              skipDuplicates: true,
            },
          },
        },
      });
    }

    this.DbInitializationLogger.log('Users added');
  }

  async migrateArticles() {
    const pathForArticles = resolve(
      __dirname,
      '..',
      'src',
      'initialization-data',
      'articles.json',
    );
    const articles = JSON.parse(readFileSync(pathForArticles, 'utf-8'));
    const generatedUsersInDb = await this.prisma.user.findMany({});
    this.DbInitializationLogger.log('Migrating articles');
    this.DbInitializationLogger.log(articles.length);

    for (const article of articles) {
      const {
        article_tag,
        articles_content,
        article_id,
        article_likes,
        article_comments,
        url,
        ...modifiedArticle
      } = article;
      const currentUser = generatedUsersInDb[article.user_id - 1];

      modifiedArticle.user_id = currentUser.user_id;

      const modifiedArticleLikes = article_likes.map((like) => ({
        ...like,
        user_id: currentUser.user_id,
      }));

      const modifiedArticleComments = article_comments.map((comment) => {
        const { article_comment_likes, ...modifiedComment } = comment;
        return {
          ...modifiedComment,
          user_id: currentUser.user_id,
          article_comment_likes: article_comment_likes.map((like) => ({
            ...like,
            user_id: currentUser.user_id,
          })),
        };
      });

      const articleAdded = await this.prisma.article.create({
        data: {
          user_id: currentUser.user_id,
          ...modifiedArticle,
          article_tag: {
            createMany: {
              data: article_tag.map((tag: string) => ({
                tag_name: tag,
              })),
              skipDuplicates: true,
            },
          },
          articles_content: {
            createMany: {
              data: articles_content.map(([value, content_type]) => ({
                value,
                content_type,
                created_at: article.created_at,
              })),
              skipDuplicates: true,
            },
          },
          article_likes: {
            createMany: {
              data: modifiedArticleLikes as Prisma.article_likeCreateManyInput,
              skipDuplicates: true,
            },
          },
        } as Prisma.articleUncheckedCreateInput,
      });

      for (const articleComment of modifiedArticleComments) {
        const { article_comment_likes, ...modifiedArticleComment } =
          articleComment;

        await this.prisma.article_comment.create({
          data: {
            article_id: articleAdded.article_id,
            ...modifiedArticleComment,
            article_comment_likes: {
              createMany: {
                data: article_comment_likes,
                skipDuplicates: true,
              },
            },
          },
        });
      }
    }

    this.DbInitializationLogger.log('Articles added');
    // await this.prisma.article.createMany({
    //   data: articlesWithoutTagsAndContent,
    //   skipDuplicates: true,
    // });
    // for (const article of articles) {
    //   await this.prisma.article.update({
    //     where: {
    //       article_id: article.article_id,
    //     },
    //     data: {
    //       articles_content: {
    //         createMany: {
    //           data: article.articles_content.map(([value, content_type]) => ({
    //             value,
    //             content_type,
    //             created_at: article.created_at,
    //           })),
    //           skipDuplicates: true,
    //         },
    //       },
    //       article_tag: {
    //         createMany: {
    //           data: article.article_tag.map((tag: string) => ({
    //             tag_name: tag,
    //           })),
    //           skipDuplicates: true,
    //         },
    //       },
    //     },
    //   });
    // }
  }
}
