import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException, HttpException)
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
    private readonly webSocketExceptionFilterLogger = new Logger(
        WebsocketExceptionsFilter.name,
    );
    catch(exception: WsException | HttpException, host: ArgumentsHost) {
        const client = host.switchToWs().getClient() as Socket;
        const error =
            exception instanceof WsException
                ? exception.getError()
                : exception.getResponse();
        const details =
            error instanceof Object ? { ...error } : { message: error };
        client.emit('error', details);
    }
}
