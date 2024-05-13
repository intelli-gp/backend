import { SerializedUser } from 'src/modules/users/serialized-types/serialized-user';
import { NotificationType } from '../enums/notification-primary-types.enum';

export type FollowNotification = {
    eventName: NotificationType<'FOLLOW'>;
    message: SerializedUser;
};
