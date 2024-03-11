import { JoinChatGroupDto } from '../../dto';

export interface ClientToServerEvents {
  createMessage: () => void;
  joinRoom: (client: Socket, dto: JoinChatGroupDto) => void;
  leaveRoom: (client: Socket, dto: JoinChatGroupDto) => void;
  typing: (data: { isTyping: boolean; username: string }) => void;
}
