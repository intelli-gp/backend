import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { sendFailureResponse } from 'src/utils/response-handler/failure.response-handler';
import {
    PrismaErrorStatusCode,
    PrismaErrorMessage,
} from './utils/prisma-errors';
import { Response } from 'express';
import { Socket } from 'socket.io';
import { error } from 'console';

// Got this from docs and logging output
export type PrismaMeta = {
    target: string;
    field_name: string;
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    private readonly prismaExceptionFilterLogger = new Logger(
        PrismaExceptionFilter.name,
    );
    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost,
    ) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        sendFailureResponse(
            response,
            PrismaErrorStatusCode[exception.code] || HttpStatus.BAD_REQUEST,
            {
                errorMessage:
                    PrismaErrorMessage[exception.code] || exception.code,
                errorTarget:
                    (exception.meta as PrismaMeta)?.target ||
                    (exception.meta as PrismaMeta)?.field_name,
            },
        );
    }
}

@Catch(Prisma.PrismaClientKnownRequestError)
export class WsPrismaExceptionFilter {
    private readonly wsPrismaExceptionFilterLogger = new Logger(
        WsPrismaExceptionFilter.name,
    );
    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost,
    ) {
        const client = host.switchToWs().getClient() as Socket;

        this.wsPrismaExceptionFilterLogger.error('Prisma Exception');
        this.wsPrismaExceptionFilterLogger.error(exception);
        this.wsPrismaExceptionFilterLogger.error(error);
        const details = {
            errorMessage: PrismaErrorMessage[exception.code] || exception.code,
            errorTarget:
                (exception.meta as PrismaMeta)?.target ||
                (exception.meta as PrismaMeta)?.field_name,
        };

        this.wsPrismaExceptionFilterLogger.error(details);
        client.emit('error', details);
    }
}
