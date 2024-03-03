import { Body, Controller, HttpCode, HttpStatus, Patch } from '@nestjs/common';
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
    return sendSuccessResponse(
      new SerializedPoints(
        await this.gamificationService.changePoints(userId, pointsDto),
      ),
    );
  }
}
