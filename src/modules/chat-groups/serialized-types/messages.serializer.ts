import { Prisma, attachment, message, user } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';

export class SerializedMessage {
  MessageID: number;

  @Transform(({ value }) => {
    return `Chat-Group-${value}`;
  })
  RoomID: string;

  @Transform(({ value }: { value: user }) => {
    return value?.username;
  })
  User: any;

  @Transform(({ value, obj }: { value: string; obj: message }) => {
    return obj.deleted ? 'This message has been deleted' : value;
  })
  Content: string;

  Attachment: attachment;

  CreatedAt: string;

  @Exclude()
  deleted: boolean;

  @Exclude()
  updated_at: Date;

  constructor(
    partial: Partial<Omit<Prisma.messageWhereInput, 'AND' | 'OR' | 'NOT'>>,
  ) {
    // Object.assign(this, partial);
    this.MessageID = Number(partial?.message_id);
    this.RoomID = `Chat-Group-${partial?.group_id}`;
    this.User = {
      UserID: partial?.user?.user_id,
      Username: partial?.user?.username,
      FullName: partial?.user?.full_name,
      ProfileImage: partial?.user?.image,
    };
    this.Attachment = partial?.attachment as attachment;
    this.CreatedAt = partial?.created_at as string;
  }
}
