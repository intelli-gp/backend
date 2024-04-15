import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { Public } from '../auth/ParamDecorator';
import { SearchDto } from './dto/search.dto';
import { SerializedArticle } from '../articles/serialized-types/article.serialized';
import { SerializedUser } from '../users/serialized-types/serialized-user';
import { SerializedChatGroup } from '../chat-groups/serialized-types/chat-group/chat-group.serializer';
import { PaginationDto } from 'src/common/dto';
import { sendSuccessResponse } from '../../utils/response-handler/success.response-handler';

// TODO: add swagger decorators
// TODO: remove @Public()

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get('users')
  @Public()
  async searchUsers(
    @Query() searchDto: SearchDto,
    @Query() paginationData: PaginationDto,
  ) {
    let usersSearchResult = await this.searchService.searchUsers(
      searchDto.searchTerm,
      paginationData.offset,
      paginationData.limit,
    );
    return sendSuccessResponse(
      usersSearchResult.map((user) => new SerializedUser(user)),
    );
  }

  @Get('articles')
  @Public()
  async searchArticles(
    @Query() searchDto: SearchDto,
    @Query() paginationData: PaginationDto,
  ) {
    let articleSearchResult = await this.searchService.searchArticles(
      searchDto.searchTerm,
      paginationData.offset,
      paginationData.limit,
    );
    return sendSuccessResponse(
      articleSearchResult.map((article) => new SerializedArticle(article)),
    );
  }

  @Get('chat-groups')
  @Public()
  async searchGroups(
    @Query() searchDto: SearchDto,
    @Query() paginationData: PaginationDto,
  ) {
    let groupsSearchResult = await this.searchService.searchGroups(
      searchDto.searchTerm,
      paginationData.offset,
      paginationData.limit,
    );
    return sendSuccessResponse(
      groupsSearchResult.map((group) => new SerializedChatGroup(group)),
    );
  }

  @Get()
  @Public()
  async generalSearch(
    @Query() searchDto: SearchDto,
    @Query() paginationData: PaginationDto,
  ) {
    let generalSearchResult = await this.searchService.generalSearch(
      searchDto.searchTerm,
      paginationData.offset,
      paginationData.limit,
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
}
