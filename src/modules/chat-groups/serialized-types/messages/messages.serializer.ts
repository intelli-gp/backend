import { Prisma, attachment, message, message_reaction } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { SerializedChatGroup } from '../chat-group/chat-group.serializer';
import { SerializedUser } from 'src/modules/users/serialized-types/serialized-user';
import { SerializedMessageReaction } from './message-reaction.serializer';

interface SerializedMessageOptions {
  isNotification?: boolean;
  isReply?: boolean;
}

export class SerializedMessage {
  MessageID: number;

  User: any;

  Content: string;

  Attachment: attachment;

  CreatedAt: string;

  IsDeleted: boolean;

  Group: SerializedChatGroup;

  UpdatedAt: string;

  RepliedToMessage: SerializedMessage;

  Reactions: SerializedMessageReaction[];

  @Exclude()
  reply_to: number;

  @Exclude()
  replies: message[];

  constructor(
    partial: Partial<Omit<Prisma.messageWhereInput, 'AND' | 'OR' | 'NOT'>>,
    options?: SerializedMessageOptions,
  ) {
    this.MessageID = Number(partial?.message_id);
    this.Content = partial?.deleted
      ? 'This message has been deleted'
      : (partial?.content as string);

    this.User = new SerializedUser(partial?.user);
    this.IsDeleted = partial?.deleted as boolean;
    // this.Attachment = {
    //   ID: partial?.attachment?.attachment_id,
    //   URL: partial?.attachment?.url,
    //   Type: partial?.attachment?.type,
    // };

    this.CreatedAt = partial?.created_at as string;

    this.UpdatedAt = partial?.updated_at as string;

    this.Reactions = (partial?.message_reactions as message_reaction[])?.map(
      (reaction) => new SerializedMessageReaction(reaction),
    );

    if (!options?.isReply && partial?.replied_to_message) {
      this.RepliedToMessage = new SerializedMessage(
        partial?.replied_to_message,
        {
          isReply: true,
        },
      );
    }

    if (options?.isNotification) {
      this.Group = new SerializedChatGroup(partial?.group);
    }
  }
}
