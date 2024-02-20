import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  async cleanDb() {
    try {
      const models = Object.keys(this).filter(
        (modelName) => !modelName.startsWith('_') && !modelName.startsWith('$'),
      );
      for (const modelName of models) await this[modelName].deleteMany({});
    } catch (error) {
      console.error('Error cleaning database:', error);
    }
  }
}
