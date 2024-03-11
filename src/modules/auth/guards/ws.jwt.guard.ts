import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ConfigType } from 'types/config.types';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== 'ws') {
      return true;
    }

    const wsJwtGuardLogger = new Logger('WsJwtGuard');

    const client = context.switchToWs().getClient();
    const payload = WsJwtGuard.validateToken(client);
    client.user = await this.prismaService.user.findUnique({
      where: { user_id: payload['userId'] },
    });
    // error will be thrown in the validateToken function if the token is invalid
    // TODO: unit test the validate token function
    return true;
  }

  static validateToken(client: Socket) {
    // Notice: This is a static function thus we cannot use the `this` keyword nor can we dependancy inject
    const wsValidationLogger = new Logger('WsJwtValidation');

    const config = new ConfigService<ConfigType>();

    const { authorization } = client.handshake.headers;
    wsValidationLogger.debug({ authorization });
    const token: string = authorization?.split(' ')[1];
    try {
      const payload = verify(token, config.get('ACCESS_TOKEN_SECRET'));
      wsValidationLogger.debug({ payload });
      return payload;
    } catch (error) {
      wsValidationLogger.error('WS JWT validation error', error);
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
