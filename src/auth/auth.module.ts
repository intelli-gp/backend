import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { MailsService } from 'src/mails/mails.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, MailsService],
})
export class AuthModule {}
