import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { sendFailureResponse } from 'src/utils/response-handler/failure.response-handler';
import {
  PrismaErrorStatusCode,
  PrismaErrorMessage,
} from './utils/prisma-errors';
import { Response } from 'express';

// Got this from docs and logging output
export type PrismaMeta = {
  target: string;
  field_name: string;
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    sendFailureResponse(
      response,
      PrismaErrorStatusCode[exception.code] || HttpStatus.BAD_REQUEST,
      {
        errorMessage: PrismaErrorMessage[exception.code] || exception.code,
        errorTarget:
          (exception.meta as PrismaMeta).target ||
          (exception.meta as PrismaMeta).field_name,
      },
    );
  }
}
