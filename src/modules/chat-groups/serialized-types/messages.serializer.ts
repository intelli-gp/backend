import { Prisma, message, user } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';

export class SerializedMessage {
  @Expose({ name: 'MessageID' })
  message_id: number;

  @Expose({ name: 'RoomID' })
  @Transform(({ value }) => {
    return `Chat-Group-${value}`;
  })
  group_id: number;

  @Expose({ name: 'Username' })
  @Transform(({ value }: { value: user }) => {
    return value?.username;
  })
  user: user;

  @Expose({ name: 'Content' })
  @Transform(({ value, obj }: { value: string; obj: message }) => {
    return obj.deleted ? 'This message has been deleted' : value;
  })
  content: string;

  @Expose({ name: 'Attachment' })
  attachment: string;

  @Exclude()
  deleted: boolean;

  constructor(
    partial: Partial<Omit<Prisma.messageWhereInput, 'AND' | 'OR' | 'NOT'>>,
  ) {
    Object.assign(this, partial);
  }
}
