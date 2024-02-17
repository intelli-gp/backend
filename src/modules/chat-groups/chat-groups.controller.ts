import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ChatGroupsService } from './chat-groups.service';
import { PaginationDto } from 'src/common/dto';
import {
  GetChatGroupsDto,
  UpdateChatGroupDto,
  CreateChatGroupDto,
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
    description: 'Returns created article',
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
    status: 201,
    description: 'Returns created article',
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
}
