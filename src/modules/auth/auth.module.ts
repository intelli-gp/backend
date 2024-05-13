import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategy/google.strategy';
import { AccessJwtStrategy } from './strategy/access.jwt.strategy';
import { RefreshJwtStrategy } from './strategy/refresh.jwt.strategy';
import { MailsService } from '../mails/mails.service';
import { LinkedinStrategy } from './strategy/linkedin.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { TagsService } from '../tags/tags.service';
import { SecondFactorAccessJwtStrategy } from './strategy/access-jwt-2fa.strategy';
import { SecondFactorAuthRefreshJwtStrategy } from './strategy/refresh-2fa.jwt.strategy';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    AuthService,
    GoogleStrategy,
    AccessJwtStrategy,
    PrismaService,
    RefreshJwtStrategy,
    LinkedinStrategy,
    SecondFactorAccessJwtStrategy,
    SecondFactorAuthRefreshJwtStrategy,
    MailsService,
    UsersService,
    TagsService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
