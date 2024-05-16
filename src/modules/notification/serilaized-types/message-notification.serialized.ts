import { SerializedChatGroup } from 'src/modules/chat-groups/serialized-types/chat-group/chat-group.serializer';
import { SerializedMessage } from 'src/modules/chat-groups/serialized-types/messages/messages.serializer';
import { ChatGroupMessagesNotification } from '../types/notifications';

export class SerializedMessagesNotifications {
    Group: SerializedChatGroup;
    UnreadMessagesCount: number;
    LastMessage: SerializedMessage;

    constructor(partial: ChatGroupMessagesNotification) {
        this.Group = new SerializedChatGroup(partial?.group);
        this.LastMessage = partial?.lastMessage
            ? new SerializedMessage(partial.lastMessage)
            : null;
        this.UnreadMessagesCount = partial.unreadMessagesCount;
    }
}
