import {
    ForbiddenException,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Reflector } from '@nestjs/core';
import { ConfigSchema } from 'src/utils/config-validation.schema';
import { IS_PUBLIC_KEY } from '../ParamDecorator';
import { ServerToClientEvents } from 'src/modules/chat-groups/messaging/types';

@Injectable()
export class WsJwtGuard implements CanActivate {
    private logger = new Logger('WsJwtGuard');

    constructor(
        private readonly prismaService: PrismaService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (isPublic || context.getType() !== 'ws') {
            return true;
        }

        const socketEventName = this.reflector.getAllAndOverride<string>(
            'eventName',
            [context.getHandler(), context.getClass()],
        );

        const client = context.switchToWs().getClient();
        const payload = WsJwtGuard.validateToken(client, socketEventName);
        if (payload)
            client.user = await this.prismaService.user.findUnique({
                where: { user_id: payload['userId'] },
            });
        // error will be thrown in the validateToken function if the token is invalid
        // TODO: unit test the validate token function
        return true;
    }

    static validateToken(client: Socket, eventName?: string) {
        // Notice: This is a static function thus we cannot use the `this` keyword nor can we dependancy inject
        const wsValidationLogger = new Logger('WsJwtValidation');
        wsValidationLogger.debug('Validating WS JWT');

        const config = new ConfigService<ConfigSchema>();

        const { authorization } = client.handshake.headers;

        // const { token } = client.handshake.auth;

        wsValidationLogger.debug({ authorization });
        const token: string = authorization?.split(' ')[1];
        wsValidationLogger.debug({ token });
        try {
            const payload = verify(token, config.get('ACCESS_TOKEN_SECRET'));
            wsValidationLogger.debug({ payload });
            return payload;
        } catch (error) {
            wsValidationLogger.error(
                `WS JWT validation error with name ${eventName}`,
                error,
                eventName,
            );
            client.handshake.auth.authFailed = true;
        }
    }
}
