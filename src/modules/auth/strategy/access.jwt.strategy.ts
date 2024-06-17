import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../types/token.payload';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(
    Strategy,
    'jwt-access',
) {
    private logger = new Logger(AccessJwtStrategy.name);
    constructor(
        config: ConfigService,
        private readonly prisma: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('ACCESS_TOKEN_SECRET'),
        });
    }

    async validate(payload: TokenPayload) {
        const user = await this.prisma.user.findUnique({
            where: {
                user_id: payload.userId,
            },
        });

        if (!user) {
            throw new ForbiddenException('Access Denied');
        }
        return user;
    }
}
