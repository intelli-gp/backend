import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  readonly prismaClient: PrismaClient;
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
      const models = Object.keys(this.prismaClient).filter(
        (modelName) =>
          modelName !== 'constructor' && modelName !== 'disconnect',
      );

      for (const modelName of models) {
        await this.prismaClient[modelName].deleteMany({});
        console.log(`Deleted all records from ${modelName} table.`);
      }

      console.log('Database cleaned successfully.');
    } catch (error) {
      console.error('Error cleaning database:', error);
    }
  }
}
