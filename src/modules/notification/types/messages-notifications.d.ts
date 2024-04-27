import { group, message } from '@prisma/client';
import { SerializedMessage } from 'src/modules/chat-groups/serialized-types/messages/messages.serializer';
export type ChatGroupMessagesNotification = {
  group: group;
  lastMessage: message;
  unreadMessagesCount: number;
};

export type chatNotification = {
  eventName: 'chat-group-message';
  message: SerializedMessage;
};
