import { Prisma, group, message } from '@prisma/client';

export type ChatGroupMessagesNotification = {
  group: group;
  lastMessage: message;
  unreadMessagesCount: number;
};
