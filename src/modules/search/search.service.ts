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
import { SearchHit } from '@elastic/elasticsearch/lib/api/types';

const config = new ConfigService();

enum INDICES_NAMES {
  ARTICLES = 'mujedd_articles',
  CHAT_GROUPS = 'mujedd_groups',
  USERS = 'mujedd_users',
}

const FUZZINESS = 1; // https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#fuzziness

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
              'tags',
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

  async searchArticles(
    searchTerm: string,
    from: number,
    size: number,
  ): Promise<ArticleSearchResult[]> {
    this.SearchLogger.log(
      `Initiate articles search query about "${searchTerm}"`,
    );

    try {
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

      return queryResult.hits.hits.map(
        (hit) => (hit as SearchHit<ArticleSearchResult>)._source,
      );
    } catch (error) {
      this.SearchLogger.error(`Error in articles search : ${error}`);
      return [];
    }
  }

  async searchGroups(
    searchTerm: string,
    from: number,
    size: number,
  ): Promise<GroupSearchResult[]> {
    this.SearchLogger.log(`Initiate groups search query about "${searchTerm}"`);

    try {
      let queryResult = await this.ElasticClient.search({
        index: INDICES_NAMES.CHAT_GROUPS,
        from,
        size,
        query: {
          multi_match: {
            query: searchTerm,
            fields: ['title^3', 'group_tag.tag_name^2', 'description'],
            fuzziness: FUZZINESS,
          },
        },
      });
      return queryResult.hits.hits.map(
        (hit) => (hit as SearchHit<GroupSearchResult>)._source,
      );
    } catch (error) {
      this.SearchLogger.error(`Error in groups search : ${error}`);
      return [];
    }
  }

  async generalSearch(
    searchTerm: string,
    from: number,
    size: number,
  ): Promise<GeneralSearchResult> {
    this.SearchLogger.log(
      `Initiate general search query about "${searchTerm}"`,
    );

    let emptySearchResult: GeneralSearchResult = {
      articles: [],
      groups: [],
      users: [],
    };

    try {
      let queryResult = await this.ElasticClient.search<
        ArticleSearchResult | GroupSearchResult | UserSearchResult
      >({
        from,
        size,
        index: '_all',
        query: {
          multi_match: {
            query: searchTerm,
            fields: [
              'title^3',
              'full_name^3',
              'username^3',
              'email^3',
              'headline^2',
              'phone_number^2',
              '*tags.tag_name^2',
              'articles_content.value^2',
              'description',
              'bio',
            ],
            fuzziness: FUZZINESS,
          },
        },
      });

      let result = queryResult.hits.hits.reduce(
        (acc: GeneralSearchResult, hit) => {
          if (hit._source['user_id']) {
            acc.users.push((hit as SearchHit<UserSearchResult>)._source);
          } else if (hit._source['article_id']) {
            acc.articles.push((hit as SearchHit<ArticleSearchResult>)._source);
          } else if (hit._source['group_id']) {
            acc.groups.push((hit as SearchHit<GroupSearchResult>)._source);
          }
          return acc;
        },
        emptySearchResult,
      );

      return result;
    } catch (error) {
      this.SearchLogger.error(`Error in general search : ${error}`);
      return emptySearchResult;
    }
  }
}
