import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { PrismaErrors } from './types/prisma-errors';

@Catch(HttpException)
export class PrismaFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const resData = exception.getResponse();
    console.log(resData);

    response.status(status).json({
      statusCode: status,
      data: {
        message: PrismaErrors[resData['errorCode']],
        field: resData['errorTarget'][0],
      },
    });
  }
}

@Catch(HttpException)
export class BrokenLinkFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      data: { message: exception.getResponse()['message'] },
    });
  }
}

@Catch(HttpException)
export class NotFoundFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      data: { message: exception.getResponse()['message'] },
    });
  }
}
