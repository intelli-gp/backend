import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AtGuard } from './modules/auth/guards/access.jwt.guard';
import { TagsModule } from './modules/tags/tags.module';
import { StudyPlannerModule } from './modules/study-planner/study-planner.module';
import { CustomFilter } from './exception-filters/custom.filter';
import { TrimStringsPipe } from './utils/pipes/trim-string.pipe';
import { PrismaExceptionFilter } from './exception-filters/prisma.filter';
import { ArticlesModule } from './modules/articles/articles.module';
import { ChatGroupsModule } from './modules/chat-groups/chat-groups.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CoursesModule } from './modules/courses/courses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend-dist'),
      exclude: ['/api*'],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      max: 100,
    }),
    TagsModule,
    ArticlesModule,
    StudyPlannerModule,
    ChatGroupsModule,
    NotificationModule,
    CoursesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: TrimStringsPipe,
    },
    {
      provide: APP_FILTER,
      useClass: CustomFilter,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
