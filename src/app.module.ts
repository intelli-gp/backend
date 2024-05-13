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
import { SearchModule } from './modules/search/search.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PaymentMethodModule } from './modules/payment-method/payment-method.module';
import { CoursesModule } from './modules/courses/courses.module';
import { DbInitializationService } from './db-initialization.service';
import { RecommenderSystemModule } from './modules/recommender-system/recommender-system.module';
import { validateConfig } from './utils/config-validation.schema';
import { SecondFactorAtGuard } from './modules/auth/guards/2fa-access-jwt.guard';
import { AiServiceModule } from './modules/ai-service/ai-service.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validate: validateConfig,
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
    PaymentMethodModule,
    SearchModule,
    CoursesModule,
    RecommenderSystemModule,
    AiServiceModule,
  ],
  providers: [
    DbInitializationService,
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
    {
      provide: APP_GUARD,
      useClass: SecondFactorAtGuard,
    },
  ],
})
export class AppModule {
  constructor(
    private readonly dbInitializationService: DbInitializationService,
  ) {}
  async onModuleInit() {
    await this.dbInitializationService.init();
    console.log('The module has been initialized.');
  }
}
