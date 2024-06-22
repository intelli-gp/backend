import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ProSubscriptionGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (user && user.plan_id) {
            return user.plan_id == 2;
        }

        throw new ForbiddenException('You need to have a pro subscription to access this feature');
    }
}
