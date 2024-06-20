import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException, HttpException)
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
    private readonly webSocketExceptionFilterLogger = new Logger(
        WebsocketExceptionsFilter.name,
    );
    constructor(private readonly reflector: Reflector) {
        super();
    }
    catch(exception: WsException | HttpException, host: ArgumentsHost) {
        const ctx = host.switchToWs();
        const client = ctx.getClient<Socket>();
        const error =
            exception instanceof WsException
                ? exception.getError()
                : exception.getResponse();

        const details =
            error instanceof Object ? { ...error } : { message: error };

        this.webSocketExceptionFilterLogger.error('details', details);
        this.webSocketExceptionFilterLogger.error('error', error);

        client.emit('error', details);
    }
}
