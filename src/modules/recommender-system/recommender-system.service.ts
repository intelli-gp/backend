import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../../common/dto';
import { PrismaService } from '../prisma/prisma.service';
import { IdDto } from './dto/article.dto';

@Injectable()
export class RecommenderSystemService {
  constructor(private readonly prismaService: PrismaService) {}

  async getArticleRecommendations(paginationData: PaginationDto, idDto: IdDto) {
    // TODO: Replace this with actual data from the recommender system (python)
    const articlesWithScores = [
      [2148, 1.0],
      [2998, 1.0],
      [1944, 1.0],
      [2352, 1.0],
      [2486, 1.0],
      [2836, 1.0],
      [2216, 1.0],
      [2781, 0.9299],
      [5083, 0.8598],
      [6128, 0.8598],
      [2769, 0.8566],
      [2260, 0.8554],
      [2615, 0.8554],
      [2686, 0.8554],
      [2252, 0.8554],
      [2327, 0.8554],
      [2364, 0.8554],
      [5291, 0.8509],
      [5134, 0.8509],
      [3344, 0.8509],
      [3880, 0.8509],
      [5539, 0.8509],
      [4000, 0.8509],
      [6961, 0.8509],
      [5754, 0.8509],
      [5400, 0.8509],
      [3744, 0.8509],
      [6840, 0.8509],
      [5457, 0.8495],
      [4292, 0.8495],
      [3342, 0.8495],
      [3224, 0.8495],
      [5252, 0.8495],
      [2157, 0.8211],
      [2083, 0.8201],
      [223, 0.8178],
      [2812, 0.817],
      [1320, 0.8166],
      [1157, 0.8166],
      [2813, 0.8133],
      [1004, 0.8101],
      [1668, 0.8101],
      [2879, 0.8101],
      [2711, 0.8084],
      [2959, 0.8084],
      [2120, 0.8084],
      [2418, 0.8084],
      [4500, 0.8041],
      [3706, 0.8041],
      [6555, 0.8041],
      [3204, 0.8041],
      [3176, 0.8041],
      [5471, 0.8041],
      [6250, 0.7867],
      [383, 0.7863],
      [700, 0.7786],
    ];

    const articleNeeded = articlesWithScores.slice(
      paginationData.offset,
      paginationData.offset + paginationData.limit,
    );

    const articleNums = articleNeeded.map((article) => Number(article[0]));
    console.log(articleNums);

    const articles = await this.prismaService.article.findMany({
      where: {
        article_id: {
          in: articleNums,
        },
      },
      include: {
        article_tag: true,
        user: {
          include: {
            followed_by: true,
          },
        },
        articles_content: true,
        article_likes: {
          include: {
            user: true,
          },
        },
        article_comments: {
          include: {
            user: true,
            article_comment_likes: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return articles;
  }

  async getGroupRecommendations(paginationData: PaginationDto) {}

  async getUserRecommendation(paginationData: PaginationDto) {}

  async getCourseRecommendation(paginationData: PaginationDto) {}
}
