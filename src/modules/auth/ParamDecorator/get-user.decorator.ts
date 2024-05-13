import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { user } from '@prisma/client';

export const GetCurrentUser = createParamDecorator(
    (data: keyof user | undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        if (!data) return request.user;
        return request.user[data];
    },
);

export const WsGetCurrentUser = createParamDecorator(
    (data: keyof user | undefined, context: ExecutionContext) => {
        const client = context.switchToWs().getClient();
        if (!data) return client.user;
        return client.user[data];
    },
);
