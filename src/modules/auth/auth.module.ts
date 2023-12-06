import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategy/google.strategy';
import { AccessJwtStrategy } from './strategy/access.jwt.strategy';
import { RefreshJwtStrategy } from './strategy/refresh.jwt.strategy';
import { MailsService } from '../mails/mails.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    AuthService,
    GoogleStrategy,
    AccessJwtStrategy,
    RefreshJwtStrategy,
    MailsService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
