import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { sendFailureResponse } from '../utils/response-handler/failure.response-handler';

@Catch(HttpException)
export class CustomFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorMessage: string = exception
      .getResponse()
      .hasOwnProperty('message')
      ? exception.getResponse()['message']
      : exception.getResponse();

    sendFailureResponse(response, exception.getStatus(), {
      errorMessage,
    });
  }
}
