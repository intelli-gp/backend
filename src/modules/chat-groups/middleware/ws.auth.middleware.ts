import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';
import { WsJwtGuard } from 'src/modules/auth/guards/ws.jwt.guard';
import { PrismaService } from 'src/modules/prisma/prisma.service';

export type WsAuthMiddlewareArgs = {
    (client: Socket, next: (err?: Error) => void): void;
};

export const WsAuthMiddleware = (): WsAuthMiddlewareArgs => {
    return async (client, next) => {
        try {
            const WsAuthMiddlewareLogger = new Logger('WsAuthMiddleware');
            const payload = WsJwtGuard.validateToken(client);

            const prismaService = new PrismaService(new ConfigService());
            const currentUser = await prismaService.user.findUnique({
                where: {
                    user_id: payload['userId'],
                },
            });
            WsAuthMiddlewareLogger.debug({ currentUser });
            client['user'] = currentUser;
            next();
        } catch (error) {
            next(error);
        }
    };
};
