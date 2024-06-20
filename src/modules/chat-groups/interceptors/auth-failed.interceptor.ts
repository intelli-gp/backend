import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    BadRequestException,
  } from '@nestjs/common';
  import { Observable, of } from 'rxjs';
  import { Socket } from 'socket.io';
  
  @Injectable()
  export class AuthFailedInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const client: Socket = context.switchToWs().getClient();
  
      if (client.handshake.auth.authFailed) {
        return of({
          error: 'AuthFailedError',
          message: 'Authentication failed',
        });
      }
  
      return next.handle();
    }
  }
  