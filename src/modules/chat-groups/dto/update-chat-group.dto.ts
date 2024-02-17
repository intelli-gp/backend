import { PartialType } from '@nestjs/mapped-types';
import { CreateChatGroupDto } from './create-chat-group.dto';

export class UpdateChatGroupDto extends PartialType(CreateChatGroupDto) {}
