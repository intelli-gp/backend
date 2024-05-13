import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../types/token.payload';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class SecondFactorAccessJwtStrategy extends PassportStrategy(
    Strategy,
    'jwt-2fa',
) {
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

        // if 2fa is enabled for the user check 2fa status
        if (
            user.two_factor_auth_enabled &&
            !payload.isUserTwoFactorAuthenticated
        ) {
            throw new ForbiddenException('Access Denied - 2FA required');
        }

        return user;
    }
}
