import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import AddTaskDto from './dto/add-task.dto';
import { StudyPlannerService } from './study-planner.service';
import { GetCurrentUser } from '../auth/ParamDecorator';
import { sendSuccessResponse } from 'src/utils/response.handler';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('study-planner')
@ApiTags('study-planner')
export class StudyPlannerController {
  constructor(private readonly studyPlannerService: StudyPlannerService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'a task has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. request parameters have something wrong',
  })
  async createTask(
    @GetCurrentUser('user_id') id,
    @Body() addTaskDto: AddTaskDto,
  ) {
    return sendSuccessResponse(
      await this.studyPlannerService.createTask(id, addTaskDto),
    );
  }
}
