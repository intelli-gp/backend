import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorMessage = exception.getResponse().hasOwnProperty('message')
      ? exception.getResponse()['message']
      : exception.getResponse();

    response.status(exception.getStatus()).json({
      status: 'failure',
      data: errorMessage,
    });
  }
}
