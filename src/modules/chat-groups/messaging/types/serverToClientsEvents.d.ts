import { SerializedMessage } from '../../serialized-types/messages.serializer';

export interface ServerToClientEvents {
  isTyping: (data: { isTyping: boolean; username: string }) => void;
  newMessage: (message: SerializedMessage) => void;
  allMessages: (messages: SerializedMessage[]) => void;
  userStatus: (data: {
    username: string;
    status: 'online' | 'offline';
  }) => void;
}
