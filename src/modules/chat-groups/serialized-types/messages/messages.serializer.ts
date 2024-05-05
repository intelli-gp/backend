import { Prisma, attachment } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { SerializedChatGroup } from '../chat-group/chat-group.serializer';
import { SerializedUser } from 'src/modules/users/serialized-types/serialized-user';
import { Logger } from '@nestjs/common';
import { SerializedAttachment } from './attachment.serializer';

export class SerializedMessage {
  MessageID: number;

  User: any;

  Content: string;

  Attachment?: SerializedAttachment[];

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
    Logger.debug("partial?.attachment");

    Logger.debug(partial?.attachment);

    if (partial?.attachment) {
      this.Attachment = (partial.attachment as Prisma.attachmentWhereInput []).map( att => (
        new SerializedAttachment(att)
      ));
    } else {
      this.Attachment = [];
    }

    this.CreatedAt = partial?.created_at as string;
    if (isNotification) {
      this.Group = new SerializedChatGroup(partial?.group);
    }
  }
}
