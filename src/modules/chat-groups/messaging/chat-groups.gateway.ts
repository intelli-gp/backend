import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  Injectable,
  Logger,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WsAuthMiddleware } from '../middleware/ws.auth.middleware';
import { WsJwtGuard } from 'src/modules/auth/guards/ws.jwt.guard';
import { CreateMessageDto, IsTypingDto, JoinChatGroupDto } from '../dto';
import { ServerToClientEvents, ClientToServerEvents } from './types';
import { WebsocketExceptionsFilter } from 'src/exception-filters/ws.filter';
import { GroupUsersService } from './group-users.service';
import { WsGetCurrentUser } from 'src/modules/auth/ParamDecorator';
import { MessagingService } from './messaging.service';
import { WsPrismaExceptionFilter } from 'src/exception-filters/prisma.filter';
import { SerializedMessage } from '../serialized-types/messages.serializer';
import { EditMessageDto } from '../dto/edit-message.dto';
import { DeleteMessageDto } from '../dto/delete-message.dto';
import { user } from '@prisma/client';
import { UsersService } from 'src/modules/users/users.service';
import { Reflector } from '@nestjs/core';

@Injectable()
@WebSocketGateway({
  namespace: 'chat-groups',
  cors: true,
})
@UseFilters(new WebsocketExceptionsFilter(), new WsPrismaExceptionFilter())
@UseInterceptors(new ClassSerializerInterceptor(new Reflector()))
/**
 We use the guard even though we supplied a middleware before connecting for an 
 extra layer of protection after connection each message sent will be checked for
 */
@UseGuards(WsJwtGuard)
@UsePipes(
  new ValidationPipe({
    whitelist: true,
  }),
)
export class ChatGroupsGateway {
  private gatewayLogger = new Logger('ChatGroupsGateway');

  @WebSocketServer()
  // we can add event types here to the Server type Server<any, EventsTypes>
  // add event type and event payload type
  private wss: Server<ClientToServerEvents, ServerToClientEvents>;

  constructor(
    private readonly groupUsersService: GroupUsersService,
    private readonly messagingService: MessagingService,
    private readonly usersService: UsersService,
  ) {}
  createGroupTitle(groupId: number) {
    return `Chat-Group-${groupId}`;
  }

  afterInit(client: Socket) {
    this.gatewayLogger.log('ChatGroupsGateway initialized');
    /*
    We use this way of middleware using at the afterInit that is exposed to us by nestjs 
    because we need to authenticate the user before any other event is triggered
    therefore applying the middleware at initialization is the best way to do it so far
    until nestjs provides a clear and better way to do it

    Notice: This type assertion is necessary because the client.use() method Types are wrong
    */
    client.use(WsAuthMiddleware() as any);
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    this.gatewayLogger.log(`Client connected: ${client.id}`);
    const currentUser = client['user'] as user;

    // update online status of the user in db
    await this.usersService.updateUserConnectedStatus(
      currentUser.user_id,
      true,
    );

    // send to all users that this user's status
    // we should send to all friends but we don't have friends yet
    client.broadcast.emit('userStatus', {
      username: currentUser.username,
      status: 'online',
    });
  }

  async handleDisconnect(client: Socket) {
    this.gatewayLogger.log(`Client disconnected: ${client.id}`);
    const currentUser = client['user'] as user;

    // update online status of the user in db
    await this.usersService.updateUserConnectedStatus(
      currentUser.user_id,
      false,
    );

    // send to all users that this user's status
    // we should send to all friends but we don't have friends yet
    client.broadcast.emit('userStatus', {
      username: currentUser.username,
      status: 'offline',
    });
  }

  @SubscribeMessage('createMessage')
  async createMessage(
    @WsGetCurrentUser('user_id') userId: number,
    @MessageBody() data: CreateMessageDto,
  ) {
    this.gatewayLogger.log(
      `Creating message in room ${data.GroupID} with content ${data.Content}`,
    );

    const messagePayload = await this.messagingService.createMessage(
      data.GroupID,
      userId,
      data.Content,
    );

    const groupTitle = this.createGroupTitle(data.GroupID);

    this.wss
      .to(groupTitle)
      .emit('newMessage', new SerializedMessage(messagePayload));
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(
    @WsGetCurrentUser('user_id') userId: number,
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: JoinChatGroupDto,
  ) {
    if (
      !(await this.groupUsersService.isUserMemberOfGroup(
        userId,
        dto.ChatGroupId,
      ))
    ) {
      throw new BadRequestException('User is not a member of this group');
    }

    const groupTitle = this.createGroupTitle(dto.ChatGroupId);

    this.gatewayLogger.log(`Joining room ${groupTitle}`);
    const messages = await this.messagingService.getMessages(dto.ChatGroupId);
    client.join(groupTitle);
    client.emit(
      'allMessages',
      messages.map((message) => {
        return new SerializedMessage(message);
      }),
    );
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: JoinChatGroupDto,
  ) {
    // TODO: add logic to check if user is in this room
    // TODO: add logic to check if room exists
    // TODO: change the group_user status

    const groupTitle = this.createGroupTitle(dto.ChatGroupId);

    this.gatewayLogger.log(`Leaving room ${groupTitle}`);

    client.leave(groupTitle);
  }

  @SubscribeMessage('typing')
  typing(
    @MessageBody() dto: IsTypingDto,
    @WsGetCurrentUser() user: user,
    @ConnectedSocket() client: Socket,
  ) {
    // get group name
    const groupTitle = this.createGroupTitle(dto.GroupID);

    // broadcast emit that this client is typing except this client himself
    client.to(groupTitle).emit('isTyping', {
      IsTyping: dto.IsTyping,
      Username: user.username,
      FullName: user.full_name,
    });
  }

  @SubscribeMessage('deleteMessage')
  async deleteMessage(
    @MessageBody() dto: DeleteMessageDto,
    @WsGetCurrentUser('user_id') userId: number,
  ) {
    const { messagesAfterDeletion, groupId } =
      await this.messagingService.deleteMessage(dto.MessageID, userId);

    const groupTitle = this.createGroupTitle(groupId);

    this.wss.to(groupTitle).emit(
      'allMessages',
      messagesAfterDeletion.map((message) => {
        return new SerializedMessage(message);
      }),
    );
  }

  @SubscribeMessage('editMessage')
  async editMessage(
    @MessageBody() data: EditMessageDto,
    @WsGetCurrentUser('user_id') userId: number,
  ) {
    const { messagesAfterEdit, groupId } =
      await this.messagingService.editMessage(
        data.MessageID,
        userId,
        data.Content,
      );

    const groupTitle = this.createGroupTitle(groupId);

    this.wss.to(groupTitle).emit(
      'allMessages',
      messagesAfterEdit.map((message) => {
        return new SerializedMessage(message);
      }),
    );
  }
}