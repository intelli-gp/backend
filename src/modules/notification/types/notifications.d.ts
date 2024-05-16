import { NotificationType } from '../enums/notification-primary-types.enum';
import { ArticleNotificationType } from '../enums/article-notifications.enum';
import { SerializedUser } from '../../users/serialized-types/serialized-user';
import { SerializedArticle } from 'src/modules/articles/serialized-types/article.serialized';
import { SerializedChatGroup } from 'src/modules/chat-groups/serialized-types/chat-group/chat-group.serializer';
import { group, message } from '@prisma/client';
import { SerializedMessage } from 'src/modules/chat-groups/serialized-types/messages/messages.serializer';

export type ChatGroupMessagesNotification = {
    group: group;
    lastMessage: message;
    unreadMessagesCount: number;
};

// TODO: DRY violation

export type ArticleNotification = {
    EventName: NotificationType<'ARTICLE'>;
    Type: ArticleNotificationType<void>;
    Sender: Pick<
        SerializedUser,
        'ID' | 'ProfileImage' | 'Username' | 'FullName'
    >;
    Entity: Pick<SerializedArticle, 'ID' | 'Title'> & {
        EntityCreator: Pick<
            SerializedUser,
            'ID' | 'ProfileImage' | 'Username' | 'FullName'
        >;
    };
};

export type MessageNotification = {
    EventName: NotificationType<'MESSAGE'>;
    Type: null;
    Sender: Pick<
        SerializedUser,
        'ID' | 'ProfileImage' | 'Username' | 'FullName'
    >;
    Entity: Pick<
        SerializedMessage,
        'Content' | 'CreatedAt' | 'IsDeleted' | 'MessageID' | 'User' | 'Type'
    > & {
        Group: Pick<
            SerializedChatGroup,
            'ID' | 'GroupTitle' | 'GroupCoverImage'
        >;
    };
};

export type FollowNotification = {
    EventName: NotificationType<'FOLLOW'>;
    Type: null;
    Sender: Pick<
        SerializedUser,
        'ID' | 'ProfileImage' | 'Username' | 'FullName'
    >;
    Entity: null;
};

export type NotificationEvents =
    | ArticleNotification
    | MessageNotification
    | FollowNotification;
