import { Controller, Get, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { PaginationDto } from 'src/common/dto';
import { sendSuccessResponse } from 'src/utils/response.handler';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getAllTags(@Query() paginationData: PaginationDto) {
    return sendSuccessResponse(this.tagsService.getAllTags(paginationData));
  }

  @Get('suggested')
  getSuggestedTags(@Query() paginationData: PaginationDto) {
    return sendSuccessResponse(
      this.tagsService.getSuggestedTags(paginationData),
    );
  }
}
