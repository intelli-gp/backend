import { FailurePayload } from 'src/utils/response-handler/types/failure-payload';

export const SwaggerFailureResponseExample = (payload: FailurePayload) => {
    return {
        properties: {
            data: {
                type: 'object',
                example: {
                    errorMessage: payload.errorMessage,
                    errorTarget: payload.errorTarget,
                },
            },
        },
    };
};
