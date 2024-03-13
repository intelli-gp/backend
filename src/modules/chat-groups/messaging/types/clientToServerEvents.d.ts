import { IsTypingDto, JoinChatGroupDto } from '../../dto';
import { DeleteMessageDto } from '../../dto/delete-message.dto';
import { EditMessageDto } from '../../dto/edit-message.dto';

export interface ClientToServerEvents {
  createMessage: () => void;
  joinRoom: (client: Socket, dto: JoinChatGroupDto) => void;
  leaveRoom: (client: Socket, dto: JoinChatGroupDto) => void;
  typing: (data: IsTypingDto) => void;
  editMessage: (data: EditMessageDto) => void;
  deleteMessage: (data: DeleteMessageDto) => void;
}
