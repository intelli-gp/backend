import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { Public } from '../auth/ParamDecorator';
import { SearchDto } from './dto/search.dto';

// TODO: add swagger decorators
// TODO: remove @Public()

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get('users')
  @Public()
  async searchUsers(@Query() searchDto: SearchDto) {
    return await this.searchService.searchUsers(searchDto.searchTerm);
  }

  @Get('articles')
  @Public()
  async searchArticles(@Query() searchDto: SearchDto) {
    return await this.searchService.searchArticles(searchDto.searchTerm);
  }

  @Get('chat-groups')
  @Public()
  async searchGroups(@Query() searchDto: SearchDto) {
    return await this.searchService.searchGroups(searchDto.searchTerm);
  }

  @Get()
  @Public()
  async generalSearch(@Query() searchDto: SearchDto) {
    return await this.searchService.generalSearch(searchDto.searchTerm);
  }
}
