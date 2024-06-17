import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_SECOND_FACTOR_PUBLIC_KEY } from '../ParamDecorator';

@Injectable()
export class SecondFactorAtGuard extends AuthGuard('jwt-2fa') {
    private logger = new Logger(SecondFactorAtGuard.name);
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride(
            IS_SECOND_FACTOR_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );


        if (isPublic) return true;

        return super.canActivate(context);
    }
}
