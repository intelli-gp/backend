import { ARTICLE_NOTIFICATION_TYPES } from './article-notifications.enum';

export const NOTIFICATION_TYPES = {
    MESSAGE: 'chat-group-message',
    ARTICLE: 'article',
    FOLLOW: 'follow',
} as const;

export type NotificationType<T extends keyof typeof NOTIFICATION_TYPES | void> =
    T extends keyof typeof NOTIFICATION_TYPES
        ? (typeof NOTIFICATION_TYPES)[T]
        : (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];

export const NOTIFICATION_SUB_TYPES = {
    [NOTIFICATION_TYPES.ARTICLE]: ARTICLE_NOTIFICATION_TYPES,
    [NOTIFICATION_TYPES.MESSAGE]: {
        MESSAGE: 'message',
        EVENT: 'event',
        WARNING: 'warning',
    },
    [NOTIFICATION_TYPES.FOLLOW]: {
        FOLLOW: 'follow',
        UNFOLLOW: 'unfollow',
    },
} as const;

export type NotificationSubtype<T extends keyof typeof NOTIFICATION_SUB_TYPES> =
    T extends keyof typeof NOTIFICATION_SUB_TYPES
        ? (typeof NOTIFICATION_SUB_TYPES)[T][keyof (typeof NOTIFICATION_SUB_TYPES)[T]]
        : never;
