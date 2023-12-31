import { Controller, Get, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { PaginationDto } from 'src/common/dto';
import { sendSuccessResponse } from 'src/utils/response.handler';
import { Public } from '../auth/ParamDecorator';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async getAllTags(@Query() paginationData: PaginationDto) {
    const tags = await this.tagsService.getAllTags(paginationData);
    return sendSuccessResponse(tags);
  }

  @Get('suggested')
  async getSuggestedTags(@Query() paginationData: PaginationDto) {
    const tags = await this.tagsService.getSuggestedTags(paginationData);
    return sendSuccessResponse(tags);
  }
}
