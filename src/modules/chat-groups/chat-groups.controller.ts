import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ChatGroupsService } from './chat-groups.service';
import { PaginationDto } from 'src/common/dto';
import {
  GetChatGroupsDto,
  UpdateChatGroupDto,
  CreateChatGroupDto,
  JoinChatGroupDto,
} from './dto';
import { SerializedChatGroup } from './serialized-types/chat-group.serializer';
import { GetCurrentUser } from '../auth/ParamDecorator';
import { sendSuccessResponse } from 'src/utils/response-handler/success.response-handler';
import { ApiResponse } from '@nestjs/swagger';
import { swaggerSuccessExample } from 'src/utils/swagger/example-generator';
import { multipleGroupsExample, singleGroupExample } from './swagger-examples';

@Controller('chat-groups')
export class ChatGroupsController {
  private logger = new Logger('ChatGroupsController');
  constructor(private readonly chatGroupsService: ChatGroupsService) {}
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Returns created group',
    schema: swaggerSuccessExample(null, singleGroupExample),
  })
  async createChatGroup(
    @GetCurrentUser('user_id') userId,
    @Body() dto: CreateChatGroupDto,
  ) {
    const chatGroup = await this.chatGroupsService.createChatGroup(dto, userId);
    Logger.log(chatGroup);
    return sendSuccessResponse(new SerializedChatGroup(chatGroup));
  }
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns groups array',
    schema: swaggerSuccessExample(null, multipleGroupsExample),
  })
  async getChatGroups(@Query() dto: GetChatGroupsDto) {
    const paginationData: PaginationDto = {
      limit: dto.limit,
      offset: dto.offset,
    };
    const chatGroups = await this.chatGroupsService.getChatGroups(
      paginationData,
      dto.ID,
    );

    return sendSuccessResponse(
      chatGroups.map((chatGroup) => new SerializedChatGroup(chatGroup)),
    );
  }

  @Patch('/:ID([0-9]+)')
  @ApiResponse({
    status: 200,
    description: 'Returns updated group',
    schema: swaggerSuccessExample(null, multipleGroupsExample),
  })
  async updateChatGroup(
    @Body() dto: UpdateChatGroupDto,
    @Param() groupIdentifier: GetChatGroupsDto,
    @GetCurrentUser('user_id') userId,
  ) {
    this.logger.debug({ dto, groupIdentifier, userId });
    const chatGroup = await this.chatGroupsService.updateChatGroup(
      groupIdentifier.ID,
      dto,
      userId,
    );
    return sendSuccessResponse(new SerializedChatGroup(chatGroup));
  }

  @Post('/join')
  async joinChatGroup(
    @Body() dto: JoinChatGroupDto,
    @GetCurrentUser('user_id') userId,
  ) {
    await this.chatGroupsService.joinChatGroup(userId, dto.ChatGroupId);
    return sendSuccessResponse('User joined the group successfully');
  }

  @Patch('/leave')
  async leaveChatGroup(
    @Body() dto: JoinChatGroupDto,
    @GetCurrentUser('user_id') userId,
  ) {
    await this.chatGroupsService.leaveChatGroup(userId, dto.ChatGroupId);
    return sendSuccessResponse('User left the group successfully');
  }

  @Delete('/:ID')
  async deleteChatGroup(
    @Param() dto: GetChatGroupsDto,
    @GetCurrentUser('user_id') userId,
  ) {
    await this.chatGroupsService.deleteChatGroup(dto.ID, userId);
    return sendSuccessResponse('Group deleted successfully');
  }
}
