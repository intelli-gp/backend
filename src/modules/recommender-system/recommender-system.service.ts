import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../../common/dto';

@Injectable()
export class RecommenderSystemService {
  constructor() {}

  getArticleRecommendations(paginationData: PaginationDto) {}

  getGroupRecommendations(paginationData: PaginationDto) {}

  getCoursesRecommendation(paginationData: PaginationDto) {}
}
