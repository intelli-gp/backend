import { SerializedMessage } from '../../serialized-types/messages/messages.serializer';
import { SerializedReadMessageInfo } from '../../serialized-types/messages/read-messages.serializer';

export type IsTypingSerialized = {
    IsTyping: boolean;
    Username: string;
    Fullname: string;
};

export interface ServerToClientEvents {
    tokenRefreshed: (data: string) => void;
    isTyping: (data: IsTypingSerialized) => void;
    allMessages: (messages: SerializedMessage[]) => void;
    newMessage: (message: SerializedMessage) => void;
    userStatus: (data: {
        username: string;
        status: 'online' | 'offline';
    }) => void;
    error: (data: { message: string }) => void;
    messageInfo: (data: SerializedReadMessageInfo[]) => void;
    newMessageReadInfo: (data: SerializedReadMessageInfo) => void;
    editedMessage: (data: SerializedMessage) => void;
}
