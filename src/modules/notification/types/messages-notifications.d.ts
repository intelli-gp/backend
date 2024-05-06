import { group, message } from '@prisma/client';
import { SerializedMessage } from 'src/modules/chat-groups/serialized-types/messages/messages.serializer';
import { NotificationType } from '../enums/notification-primary-types.enum';

export type ChatGroupMessagesNotification = {
  group: group;
  lastMessage: message;
  unreadMessagesCount: number;
};

export type chatNotification = {
  eventName: NotificationType<'MESSAGE'>;
  message: SerializedMessage;
};
