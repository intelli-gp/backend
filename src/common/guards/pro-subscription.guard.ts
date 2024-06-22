import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { user } from '@prisma/client';
import { Observable } from 'rxjs';
import { StripeService } from 'src/modules/payment/stripe.service';

@Injectable()
export class ProSubscriptionGuard implements CanActivate {
    constructor(private readonly stripeService: StripeService) {}
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const stripeCustomerId = (request?.user as user)?.stripe_customer_id;

        const subscription =
            await this.stripeService.getCustomerSubscriptions(stripeCustomerId);

        if (subscription && subscription.data.length > 0) {
            return subscription.data[0].status === 'active';
        }

        throw new ForbiddenException(
            'You need to have a pro subscription to access this feature',
        );
    }
}
