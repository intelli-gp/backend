import { Prisma } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { SerializedChatGroup } from '../chat-group/chat-group.serializer';
import { SerializedUser } from 'src/modules/users/serialized-types/serialized-user';

export class SerializedMessage {
  MessageID: number;

  User: any;

  Content: string;

  Type: string;

  CreatedAt: string;

  IsDeleted: boolean;

  // TODO: link all serializer types
  Group: any;

  MessageReadBy: any[];

  @Exclude()
  updated_at: Date;

  constructor(
    partial: Partial<Omit<Prisma.messageWhereInput, 'AND' | 'OR' | 'NOT'>>,
    isNotification = false,
  ) {
    partial
    this.MessageID = Number(partial?.message_id);
    this.Content = partial?.deleted
      ? 'This message has been deleted'
      : (partial?.content as string);

    this.User = new SerializedUser(partial?.user);
    this.IsDeleted = partial?.deleted as boolean;
 
    this.Type =partial?.type as string;
    this.CreatedAt = partial?.created_at as string;
    if (isNotification) {
      this.Group = new SerializedChatGroup(partial?.group);
    }
  }
}
