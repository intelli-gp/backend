import { SerializedMessage } from '../../serialized-types/messages.serializer';

export type IsTypingSerialized = {
  IsTyping: boolean;
  Username: string;
  Fullname: string;
};

export interface ServerToClientEvents {
  isTyping: (data: IsTypingSerialized) => void;
  newMessage: (message: SerializedMessage) => void;
  allMessages: (messages: SerializedMessage[]) => void;
  userStatus: (data: {
    username: string;
    status: 'online' | 'offline';
  }) => void;
  error: (data: { message: string }) => void;
}
