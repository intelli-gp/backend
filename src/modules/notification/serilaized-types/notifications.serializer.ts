import { Prisma, article } from '@prisma/client';
import { SerializedUser } from 'src/modules/users/serialized-types/serialized-user';
import {
    NOTIFICATION_TYPES,
    NotificationSubtype,
    NotificationType,
} from '../enums/notification-primary-types.enum';
import { SerializedArticle } from '../../articles/serialized-types/article.serialized';

type NonSerializedEntityType<T> =
    T extends NotificationType<'ARTICLE'> ? article : null;

type SerializedEntityType<T> =
    T extends NotificationType<'ARTICLE'> ? SerializedArticle : null;

export class SerializedUserNotification<
    T extends NotificationType<void>,
    U extends NotificationSubtype<T>,
> {
    ID: number;

    Sender: SerializedUser;

    IsRead: boolean;

    EventName: T;

    Type: U;

    Entity: SerializedEntityType<T>;

    CreatedAt: string;

    constructor(
        partial: Partial<
            Omit<Prisma.notificationsWhereInput, 'AND' | 'OR' | 'NOT'>
        > & { entity: NonSerializedEntityType<T> },
    ) {
        this.ID = +partial?.notification_id;
        this.Sender = new SerializedUser(partial?.sender);
        this.IsRead = partial?.is_read as boolean;
        this.EventName = partial?.primary_type as T;
        this.Type = partial?.secondary_type as U;
        this.CreatedAt = partial?.created_at as string;
        this.Entity = (
            this.EventName === NOTIFICATION_TYPES.ARTICLE
                ? new SerializedArticle(partial?.entity)
                : null
        ) as SerializedEntityType<T>;
    }
}
