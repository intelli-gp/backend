import { Controller, Get, Query } from '@nestjs/common';
import { SUGGESTION_TYPE, SearchService } from './search.service';
// import { Public } from '../auth/ParamDecorator';
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
import { ChatGroupsService } from '../chat-groups/chat-groups.service';
import { SerializedPaginated } from 'src/common/paginated-results.serializer';
import { ArticleSearchResult } from './types/search';
import { Prisma, group } from '@prisma/client';

// TODO: remove @Public()

@Controller('search')
@ApiTags('Search')
export class SearchController {
    constructor(
        private searchService: SearchService,
        private chatGroupsService: ChatGroupsService,
    ) {}

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
            new SerializedPaginated<ArticleSearchResult, SerializedArticle>(
                articleSearchResult.data,
                articleSearchResult.totalEntityCount,
                { offset, limit },
                SerializedArticle,
            ),
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
        let { data: groupsSearchResult, totalEntityCount } =
            await this.searchService.searchGroups(
                searchDto.searchTerm,
                offset,
                limit,
            );

        let fullGroupsData = await this.chatGroupsService.getChatGroupsByIds(
            groupsSearchResult.map((group) => group.group_id),
        );

        /**
         * Sorting the fullGroupsData array based on the order of groupsSearchResult array
         * as the order of groupsSearchResult array is based on the search match ranking
         * evaluated by elastic search.
         */
        let sortedFullDataGroups = fullGroupsData.sort((a, b) => {
            return (
                groupsSearchResult.findIndex(
                    (group) => group.group_id === a.group_id,
                ) -
                groupsSearchResult.findIndex(
                    (group) => group.group_id === b.group_id,
                )
            );
        });

        return sendSuccessResponse(
            new SerializedPaginated<group, SerializedChatGroup>(
                sortedFullDataGroups,
                totalEntityCount,
                { limit, offset },
                SerializedChatGroup,
            ),
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

        // Fetch full data for groups
        let fullGroupsData = await this.chatGroupsService.getChatGroupsByIds(
            generalSearchResult?.groups.map((group) => group.group_id),
        );

        /**
         * Sorting the fullGroupsData array based on the order of groupsSearchResult array
         * as the order of groupsSearchResult array is based on the search match ranking
         * evaluated by elastic search.
         */
        let sortedFullDataGroups = fullGroupsData.sort((a, b) => {
            return (
                generalSearchResult?.groups.findIndex(
                    (group) => group.group_id === a.group_id,
                ) -
                generalSearchResult?.groups.findIndex(
                    (group) => group.group_id === b.group_id,
                )
            );
        });

        let serializedResult = {
            articles: [] as SerializedArticle[],
            users: [] as SerializedUser[],
            groups: [] as SerializedChatGroup[],
        };
        serializedResult.articles = generalSearchResult.articles.map(
            (article) => new SerializedArticle(article),
        );
        serializedResult.groups = sortedFullDataGroups?.map(
            (group) => new SerializedChatGroup(group as Prisma.groupWhereInput),
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
