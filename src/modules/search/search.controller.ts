import { Controller, Get, Query } from '@nestjs/common';
import { SUGGESTION_TYPE, SearchService } from './search.service';
import { Public } from '../auth/ParamDecorator';
import { SearchDto } from './dto/search.dto';
import { SerializedArticle } from '../articles/serialized-types/article.serialized';
import { SerializedUser } from '../users/serialized-types/serialized-user';
import { SerializedChatGroup } from '../chat-groups/serialized-types/chat-group/chat-group.serializer';
import { sendSuccessResponse } from '../../utils/response-handler/success.response-handler';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { swaggerSuccessExample } from 'src/utils/swagger/example-generator';
import {
  articlesArray,
  autoCompleteExample,
  generalSearchExample,
  groupsArray,
  usersArray,
} from './swagger-examples/search-results';

// TODO: remove @Public()

@Controller('search')
@ApiTags('Search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get('users')
  @ApiResponse({
    status: 200,
    description: 'Returns users array',
    schema: swaggerSuccessExample(null, usersArray),
  })
  // @Public()
  async searchUsers(@Query() searchDto: SearchDto) {
    let { offset, limit } = searchDto;
    let usersSearchResult = await this.searchService.searchUsers(
      searchDto.searchTerm,
      offset,
      limit,
    );
    return sendSuccessResponse(
      usersSearchResult.map((user) => new SerializedUser(user)),
    );
  }

  @Get('articles')
  @ApiResponse({
    status: 200,
    description: 'Returns articles array',
    schema: swaggerSuccessExample(null, articlesArray),
  })
  // @Public()
  async searchArticles(@Query() searchDto: SearchDto) {
    let { offset, limit } = searchDto;
    let articleSearchResult = await this.searchService.searchArticles(
      searchDto.searchTerm,
      offset,
      limit,
    );
    return sendSuccessResponse(
      articleSearchResult.map((article) => new SerializedArticle(article)),
    );
  }

  @Get('chat-groups')
  @ApiResponse({
    status: 200,
    description: 'Returns groups array',
    schema: swaggerSuccessExample(null, groupsArray),
  })
  // @Public()
  async searchGroups(@Query() searchDto: SearchDto) {
    let { offset, limit } = searchDto;
    let groupsSearchResult = await this.searchService.searchGroups(
      searchDto.searchTerm,
      offset,
      limit,
    );
    return sendSuccessResponse(
      groupsSearchResult.map((group) => new SerializedChatGroup(group)),
    );
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns general search result',
    schema: swaggerSuccessExample(null, generalSearchExample),
  })
  // @Public()
  async generalSearch(@Query() searchDto: SearchDto) {
    let { offset, limit } = searchDto;
    let generalSearchResult = await this.searchService.generalSearch(
      searchDto.searchTerm,
      offset,
      limit,
    );
    let serializedResult = {
      articles: [] as SerializedArticle[],
      users: [] as SerializedUser[],
      groups: [] as SerializedChatGroup[],
    };
    serializedResult.articles = generalSearchResult.articles.map(
      (article) => new SerializedArticle(article),
    );
    serializedResult.groups = generalSearchResult.groups.map(
      (group) => new SerializedChatGroup(group),
    );
    serializedResult.users = generalSearchResult.users.map(
      (user) => new SerializedUser(user),
    );
    return sendSuccessResponse(serializedResult);
  }

  @Get('autocomplete')
  @ApiResponse({
    status: 200,
    description: 'Returns suggestions array',
    schema: swaggerSuccessExample(null, autoCompleteExample),
  })
  // @Public()
  async autocomplete(
    @Query('searchTerm') searchTerm: string,
    @Query('type') type: SUGGESTION_TYPE,
  ) {
    let result = await this.searchService.autocomplete(searchTerm, type);
    return sendSuccessResponse(result);
  }
}
