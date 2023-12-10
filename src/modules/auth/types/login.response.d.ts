import { user } from '@prisma/client';
import { Tokens } from './tokens';

export type loginResult = {
  user: user;
  accessToken: string;
  refreshToken: string;
};
