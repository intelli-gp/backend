import { Client } from '@elastic/elasticsearch';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  ArticleSearchResult,
  GeneralSearchResult,
  GroupSearchResult,
  UserSearchResult,
} from './types/search';
import {
  MsearchMultiSearchItem,
  SearchCompletionSuggestOption,
  SearchHit,
  SearchTotalHits,
} from '@elastic/elasticsearch/lib/api/types';

const config = new ConfigService();

enum INDICES_NAMES {
  ARTICLES = 'mujedd_articles',
  CHAT_GROUPS = 'mujedd_groups',
  USERS = 'mujedd_users',
  USER_SUGGESTIONS = 'mujedd_user_suggestions',
  ARTICLE_SUGGESTIONS = 'mujedd_article_suggestions',
  CHAT_GROUP_SUGGESTIONS = 'mujedd_group_suggestions',
}

export enum SUGGESTION_TYPE {
  ARTICLE = 'article',
  CHAT_GROUP = 'group',
  USER = 'user',
  ALL = 'all',
}

const FUZZINESS = `AUTO`; // https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#fuzziness

@Injectable()
export class SearchService {
  private readonly ElasticClient = new Client({
    node: `https://${config.get('ELASTIC_HOST')}:${config.get('ES_PORT')}`,
    auth: {
      username: config.get('ELASTIC_USER'),
      password: config.get('ELASTIC_PASSWORD'),
    },
    tls: {
      ca: readFileSync(join(__dirname, '../../../es-certs/ca/ca.crt')),
      rejectUnauthorized: false,
    },
  });
  private readonly SearchLogger = new Logger('SearchService');

  async searchUsers(
    searchTerm: string,
    from: number,
    size: number,
  ): Promise<UserSearchResult[]> {
    this.SearchLogger.log(`Initiate users search query about "${searchTerm}"`);

    try {
      let queryResult = await this.ElasticClient.search({
        index: INDICES_NAMES.USERS,
        from,
        size,
        query: {
          multi_match: {
            query: searchTerm,
            fields: [
              'full_name^3',
              'username^3',
              'email^3',
              'headline^2',
              'phone_number^2',
              'user_tag.tag_name',
              'bio',
            ],
            fuzziness: FUZZINESS,
          },
        },
      });
      return queryResult.hits.hits.map(
        (hit) => (hit as SearchHit<UserSearchResult>)._source,
      );
    } catch (error) {
      this.SearchLogger.error(`Error in users search : ${error}`);
      return [];
    }
  }

  async searchArticles(searchTerm: string, from: number, size: number) {
    this.SearchLogger.log(
      `Initiate articles search query about "${searchTerm}"`,
    );

    let queryResult = await this.ElasticClient.search<ArticleSearchResult>({
      index: INDICES_NAMES.ARTICLES,
      from,
      size,
      query: {
        multi_match: {
          query: searchTerm,
          fields: [
            'title^3',
            'article_tag.tag_name^2',
            'articles_content.value',
          ],
          fuzziness: FUZZINESS,
        },
      },
    });

    let data = queryResult.hits.hits.map(
      (hit) => (hit as SearchHit<ArticleSearchResult>)._source,
    );

    let numOfMatches = (queryResult.hits.total as SearchTotalHits).value || 0;

    return {
      data,
      totalEntityCount: numOfMatches,
    };
  }

  async searchGroups(searchTerm: string, from: number, size: number) {
    this.SearchLogger.log(`Initiate groups search query about "${searchTerm}"`);

    let queryResult = await this.ElasticClient.search({
      index: INDICES_NAMES.CHAT_GROUPS,
      from,
      size,
      query: {
        multi_match: {
          query: searchTerm,
          fields: ['title^3', 'group_tag.tag_name', 'description'],
          fuzziness: FUZZINESS,
        },
      },
    });

    let data = queryResult.hits.hits.map(
      (hit) => (hit as SearchHit<GroupSearchResult>)._source,
    );
    let numOfMatches = (queryResult.hits.total as SearchTotalHits).value || 0;

    return {
      data,
      totalEntityCount: numOfMatches,
    };
  }

  async generalSearch(searchTerm: string, from: number, size: number) {
    this.SearchLogger.log(
      `Initiate general search query about "${searchTerm}"`,
    );

    let emptySearchResult: GeneralSearchResult = {
      articles: [],
      groups: [],
      users: [],
    };

    try {
      let queryResult = await this.ElasticClient.msearch<
        ArticleSearchResult | GroupSearchResult | UserSearchResult
      >({
        searches: [
          { index: INDICES_NAMES.ARTICLES },
          {
            from,
            size,
            query: {
              multi_match: {
                query: searchTerm,
                fields: [
                  'title^3',
                  'article_tag.tag_name^2',
                  'articles_content.value',
                ],
                fuzziness: FUZZINESS,
              },
            },
          },
          { index: INDICES_NAMES.CHAT_GROUPS },
          {
            from,
            size,
            query: {
              multi_match: {
                query: searchTerm,
                fields: ['title^3', 'group_tag.tag_name', 'description'],
                fuzziness: FUZZINESS,
              },
            },
          },
          { index: INDICES_NAMES.USERS },
          {
            from,
            size,
            query: {
              multi_match: {
                query: searchTerm,
                fields: [
                  'full_name^3',
                  'username^3',
                  'email^3',
                  'headline^2',
                  'phone_number^2',
                  'user_tag.tag_name',
                  'bio',
                ],
                fuzziness: FUZZINESS,
              },
            },
          },
        ],
      });

      queryResult.responses.forEach((response) => {
        (response as MsearchMultiSearchItem).hits.hits.forEach(
          (hit: SearchHit) => {
            switch (hit._index) {
              case INDICES_NAMES.ARTICLES:
                emptySearchResult.articles.push(
                  (hit as SearchHit<ArticleSearchResult>)._source,
                );
                break;
              case INDICES_NAMES.CHAT_GROUPS:
                emptySearchResult.groups.push(
                  (hit as SearchHit<GroupSearchResult>)._source,
                );
                break;
              case INDICES_NAMES.USERS:
                emptySearchResult.users.push(
                  (hit as SearchHit<UserSearchResult>)._source,
                );
                break;
            }
          },
        );
      });

      return emptySearchResult;
    } catch (error) {
      this.SearchLogger.error(`Error in general search : ${error}`);
      return emptySearchResult;
    }
  }

  async autocomplete(
    searchTerm: string,
    suggestType: SUGGESTION_TYPE = SUGGESTION_TYPE.ALL,
  ): Promise<string[]> {
    this.SearchLogger.log(`Initiate suggestion query on type ${suggestType}`);

    let index: string = `${INDICES_NAMES.ARTICLE_SUGGESTIONS},${INDICES_NAMES.CHAT_GROUP_SUGGESTIONS},${INDICES_NAMES.USER_SUGGESTIONS}`;
    switch (suggestType) {
      case SUGGESTION_TYPE.ARTICLE:
        index = INDICES_NAMES.ARTICLE_SUGGESTIONS;
        break;
      case SUGGESTION_TYPE.CHAT_GROUP:
        index = INDICES_NAMES.CHAT_GROUP_SUGGESTIONS;
        break;
      case SUGGESTION_TYPE.USER:
        index = INDICES_NAMES.USER_SUGGESTIONS;
        break;
    }

    try {
      let queryResult = await this.ElasticClient.search<{
        suggestion_value: string;
      }>({
        index,
        suggest: {
          suggestions: {
            prefix: searchTerm,
            completion: {
              field: 'suggestion_value',
              fuzzy: {
                fuzziness: FUZZINESS,
              },
            },
          },
        },
      });
      let suggestions = queryResult?.suggest?.suggestions[0]
        .options as SearchCompletionSuggestOption<{
        suggestion_value: string;
      }>[];
      return suggestions.map(
        (suggestion) => suggestion._source.suggestion_value,
      );
    } catch (error) {
      this.SearchLogger.error(`Error in users suggest : ${error}`);
      return [];
    }
  }
}
