import { Socket } from 'socket.io';
import { WsJwtGuard } from 'src/modules/auth/guards/ws.jwt.guard';

export type WsAuthMiddlewareArgs = {
  (client: Socket, next: (err?: Error) => void): void;
};

export const WsAuthMiddleware = (): WsAuthMiddlewareArgs => {
  return (client, next) => {
    try {
      WsJwtGuard.validateToken(client);
      next();
    } catch (error) {
      next(error);
    }
  };
};
