import {
    IsTypingDto,
    JoinChatGroupDto,
    RefreshTokenDto,
    EditMessageDto,
    DeleteMessageDto,
} from '../../dto';

export interface ClientToServerEvents {
    refreshToken: (data: RefreshTokenDto) => void;
    createMessage: () => void;
    joinRoom: (client: Socket, dto: JoinChatGroupDto) => void;
    leaveRoom: (client: Socket, dto: JoinChatGroupDto) => void;
    typing: (data: IsTypingDto) => void;
    editMessage: (data: EditMessageDto) => void;
    deleteMessage: (data: DeleteMessageDto) => void;
    getMessageInfo: (data: DeleteMessageDto) => void;
    leaveMessageInfoRoom: (data: DeleteMessageDto) => void;
}
