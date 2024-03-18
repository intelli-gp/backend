import {
  Prisma,
  attachment,
  message,
  messages_read_status,
  user,
} from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';
import { SerializedChatGroup } from './chat-group.serializer';

export class SerializedMessage {
  MessageID: number;

  User: any;

  Content: string;

  Attachment: attachment;

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
    // Object.assign(this, partial);
    this.MessageID = Number(partial?.message_id);
    this.Content = partial.deleted
      ? 'This message has been deleted'
      : (partial?.content as string);

    console.log('Content', this.Content);
    this.User = {
      ID: partial?.user?.user_id,
      Username: partial?.user?.username,
      FullName: partial?.user?.full_name,
      ProfileImage: partial?.user?.image,
    };
    this.IsDeleted = partial?.deleted as boolean;
    // this.Attachment = {
    //   ID: partial?.attachment?.attachment_id,
    //   URL: partial?.attachment?.url,
    //   Type: partial?.attachment?.type,
    // };

    this.CreatedAt = partial?.created_at as string;
    if (isNotification) {
      this.Group = {
        ID: partial?.group?.group_id,
        GroupName: partial?.group?.title,
        GroupCoverImage: partial?.group?.cover_image_url,
      };
    }
  }
}
