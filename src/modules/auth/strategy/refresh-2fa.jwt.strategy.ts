import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../types/token.payload';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class SecondFactorAuthRefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-2fa',
) {
  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          // Retrieve the token from the cookie here
          return request.cookies['refresh_token'];
        },
      ]),
      secretOrKey: config.get('REFRESH_TOKEN_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: payload.userId,
      },
    });
    if (user.two_factor_auth_enabled && !payload.isUserTwoFactorAuthenticated) {
      throw new ForbiddenException('Access Denied - 2FA required');
    }
    return user;
  }
}
