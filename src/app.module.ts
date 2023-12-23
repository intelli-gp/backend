import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './modules/auth/guards/access.jwt.guard';
import { TagsModule } from './modules/tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    TagsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
