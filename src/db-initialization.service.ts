import { Injectable } from '@nestjs/common';
import { PrismaService } from './modules/prisma/prisma.service';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { Prisma, user } from '@prisma/client';

@Injectable()
export class DbInitializationService {
  constructor(private readonly prisma: PrismaService) {}

  async init() {
    const planCount = await this.prisma.plan.count();

    if (planCount === 0) {
      await this.migrateData();
    }
  }

  async migrateData() {
    await this.migratePlans();
    await this.migrateLevels();
    await this.migrateTags();
    await this.migrateGeneratedUsers();
  }

  async migratePlans() {
    await this.prisma.plan.create({
      data: {
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
    await this.prisma.level.create({
      data: {
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
      'initialization-data',
      'src',
      'tags_from_articles.json',
    );
    const tags = JSON.parse(readFileSync(pathForTags, 'utf-8'));
    const tagCreateManyInput = tags.map((tag: string) => ({
      tag_name: tag,
    })) as Prisma.tagCreateManyInput;
    await this.prisma.tag.createMany({
      data: tagCreateManyInput,
      skipDuplicates: true,
    });
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
      const { tags, ...rest } = user;
      return rest;
    });

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
  }
}
