import { SerializedUser } from 'src/modules/users/serialized-types/serialized-user';

export type GooglePayload = {
  user: SerializedUser;
  state: 'login' | 'signup';
};
