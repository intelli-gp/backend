import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { GetCurrentUser } from '../auth/ParamDecorator';
import { PointsDto } from './dto/points.dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SerializedPoints } from './serialized-types/serialized-points';
import { swaggerSuccessExample } from '../../utils/swagger/example-generator';
import { PointsExample } from './swagger-examples/points.example';
import { ErrorScheme } from '../study-planner/swagger-examples/error.example';
import { sendSuccessResponse } from 'src/utils/response-handler/success.response-handler';
import { BadgesExample } from './swagger-examples/badges.example';
import { BadgeDto, UserBadgeDto } from './dto/badges.dto';
import {
  SerializedBadge,
  SerializedUserBadge,
} from './serialized-types/serialized-badges';
import { PrismaExceptionFilter } from 'src/exception-filters/prisma.filter';
import { PaginationDto } from 'src/common/dto';
import { SerializedLeaderboard } from './serialized-types/serialized-leaderboard';

@ApiTags('gamification')
@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  // TODO: put it in user controller
  @Patch('change-points')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiOperation({ summary: 'add points to a certain user' })
  @ApiOkResponse({
    description: 'Points added successfully',
    schema: swaggerSuccessExample(null, PointsExample),
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: swaggerSuccessExample(null, ErrorScheme),
  })
  async addPoints(
    @Body() pointsDto: PointsDto,
    @GetCurrentUser('user_id') userId: number,
  ) {
    const user = await this.gamificationService.changePoints(userId, pointsDto);
    if (user) return sendSuccessResponse(new SerializedPoints(user));
    else throw new BadRequestException('Error adding points');
  }

  // TODO: Maybe in here or in a separate controller for badges
  @Post('add-badge')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiOperation({ summary: 'Add a badge' })
  @ApiOkResponse({
    description: 'Badge added successfully',
    schema: swaggerSuccessExample(null, BadgesExample),
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: swaggerSuccessExample(null, ErrorScheme),
  })
  async addBadge(@Body() badgeDto: BadgeDto) {
    return sendSuccessResponse(
      new SerializedBadge(await this.gamificationService.addBadge(badgeDto)),
    );
  }

  // TODO: put it in user controller
  @Post('add-user-badge')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiOperation({ summary: 'Add a badge to a certain user' })
  @ApiOkResponse({
    description: 'Badges added successfully',
    schema: swaggerSuccessExample(null, BadgesExample),
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: swaggerSuccessExample(null, ErrorScheme),
  })
  async addBadges(
    @Body() badgeDto: UserBadgeDto,
    @GetCurrentUser('user_id') userId: number,
  ) {
    return sendSuccessResponse(
      new SerializedUserBadge(
        await this.gamificationService.addUserBadge(userId, badgeDto),
      ),
    );
  }

  @Get('leaderboard')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get the leaderboard' })
  @ApiOkResponse({
    description: 'Leaderboard retrieved successfully',
    schema: swaggerSuccessExample(null, PointsExample),
  })
  async getLeaderboard(@Query() pagination: PaginationDto) {
    return sendSuccessResponse(
      (await this.gamificationService.getLeaderboard(pagination)).map(
        (user) => new SerializedLeaderboard(user),
      ),
    );
  }
}
