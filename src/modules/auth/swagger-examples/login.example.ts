import { userExample, tokenExample } from './common-data';

export const SwaggerLoginExample = {
  user: {
    type: 'object',
    example: userExample,
  },
  access_token: {
    type: 'string',
    example: tokenExample,
  },
};
