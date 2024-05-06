import { ApiProperty } from '@nestjs/swagger';
import { Prisma, message } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { SerializedUser } from 'src/modules/users/serialized-types/serialized-user';
export class SerializedMessageReaction {
  @ApiProperty({
    example: 1,
    description: 'The ID of the message',
  })
  MessageID: number;

  @ApiProperty({
    example: 'like',
    description: 'The reaction to the message',
  })
  Reaction: string;

  User: SerializedUser;

  @Exclude()
  message: message;

  @Exclude()
  user_id: number;

  constructor(
    partial: Partial<
      Omit<Prisma.message_reactionWhereInput, 'AND' | 'OR' | 'NOT'>
    >,
  ) {
    this.MessageID = Number(partial?.message_id);
    this.Reaction = partial?.reaction as string;
    console.log(partial?.user);
    this.User = new SerializedUser(partial?.user);
  }
}
