import { Controller, Get, HttpCode } from '@nestjs/common';
import { PaginationDto } from '../../common/dto';
import { RecommenderSystemService } from './recommender-system.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MultipleArticlesExample } from '../articles/swagger-examples';
import { swaggerSuccessExample } from '../../utils/swagger/example-generator';
import { multipleGroupsExample } from '../chat-groups/swagger-examples';

// TODO: Implement the Methods
@Controller('recommender-system')
@ApiTags('recommender-system')
export class RecommenderSystemController {
  constructor(
    private readonly recommenderSystemService: RecommenderSystemService,
  ) {}

  @HttpCode(200)
  @HttpCode(400)
  @ApiOkResponse({
    description: 'Returns article recommendations with pagination',
    schema: swaggerSuccessExample(null, MultipleArticlesExample),
  })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @Get('articles')
  getArticleRecommendations(paginationData: PaginationDto) {}

  @HttpCode(200)
  @HttpCode(400)
  @ApiOkResponse({
    description: 'Returns article recommendations with pagination',
    schema: swaggerSuccessExample(null, multipleGroupsExample),
  })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @Get('groups')
  getGroupRecommendations(paginationData: PaginationDto) {}

  // TODO: add swagger example for the return object in OK Response
  @HttpCode(200)
  @HttpCode(400)
  @ApiOkResponse({
    description: 'Returns article recommendations with pagination',
    schema: swaggerSuccessExample(null, {}),
  })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @Get('users')
  getUsersRecommendations(paginationData: PaginationDto) {}

  // TODO: add swagger example for the return object in OK Response
  @HttpCode(200)
  @HttpCode(400)
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @Get('courses')
  getCoursesRecommendations(paginationData: PaginationDto) {}
}
