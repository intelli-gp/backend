import { Prisma, attachment, message, user } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';

export class SerializedMessage {
  MessageID: number;

  User: any;

  Content: string;

  Attachment: attachment;

  CreatedAt: string;

  IsDeleted: boolean;

  GroupID: number;

  @Exclude()
  updated_at: Date;

  constructor(
    partial: Partial<Omit<Prisma.messageWhereInput, 'AND' | 'OR' | 'NOT'>>,
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
    this.GroupID = partial?.group_id as number;
    this.CreatedAt = partial?.created_at as string;
  }
}
