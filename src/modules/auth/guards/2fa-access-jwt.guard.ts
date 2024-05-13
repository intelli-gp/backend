import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SecondFactorAtGuard extends AuthGuard('jwt-2fa') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride(
            'isSecondFactorPublic',
            [context.getHandler(), context.getClass()],
        );

        if (isPublic) return true;

        return super.canActivate(context);
    }
}
