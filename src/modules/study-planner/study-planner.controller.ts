import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import AddTaskDto from './dto/create-task.dto';
import { StudyPlannerService } from './study-planner.service';
import { GetCurrentUser } from '../auth/ParamDecorator';
import { sendSuccessResponse } from '../../utils/response-handler/success.response-handler';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SerializedTask } from './serialized-types/serialized-task';
import { PaginationDto } from '../../common/dto';
import UpdateTaskDto from './dto/update-task.dto';
import { swaggerSuccessExample } from 'src/utils/swagger/example-generator';
import { MultipleTasksExample } from './swagger-examples/multiple-tasks.example';
import { ErrorScheme } from './swagger-examples/error.example';
import { CommonTask } from './swagger-examples/common-data';
import { DeleteTaskExample } from './swagger-examples/delete-task.example';

// TODO: add swagger example for the return object for each output from each controller
@Controller('study-planner')
@ApiTags('study-planner')
export class StudyPlannerController {
  constructor(private readonly studyPlannerService: StudyPlannerService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiOperation({ summary: 'Get all tasks paginated' })
  @ApiOkResponse({
    description: 'Get all tasks paginated',
    schema: swaggerSuccessExample(null, MultipleTasksExample),
  })
  @ApiBadRequestResponse({
    description: 'Bad request. request parameters have something wrong',
    schema: swaggerSuccessExample(null, ErrorScheme),
  })
  async getTasks(
    @GetCurrentUser('user_id') id,
    @Query() paginationDto: PaginationDto,
  ) {
    return sendSuccessResponse(
      (await this.studyPlannerService.getTasks(id, paginationDto)).map(
        (task) => new SerializedTask(task),
      ),
    );
  }

  @Get(':task_id')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiOperation({ summary: 'Get a specific task' })
  @ApiOkResponse({
    description: 'successfully get a specific task',
    schema: swaggerSuccessExample(null, CommonTask),
  })
  @ApiBadRequestResponse({
    description: 'Bad request. request parameters have something wrong',
    schema: swaggerSuccessExample(null, ErrorScheme),
  })
  // TODO: Pipe need to return custom error message
  async getTaskById(
    @GetCurrentUser('user_id') userId,
    @Param(
      'task_id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    taskId: number,
  ) {
    return sendSuccessResponse(
      new SerializedTask(
        await this.studyPlannerService.getTask(userId, +taskId),
      ),
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiOkResponse({
    description: 'a task has been successfully created.',
    schema: swaggerSuccessExample(null, CommonTask),
  })
  @ApiBadRequestResponse({
    description: 'Bad request. request parameters have something wrong',
    schema: swaggerSuccessExample(null, ErrorScheme),
  })
  async createTask(
    @GetCurrentUser('user_id') id,
    @Body() addTaskDto: AddTaskDto,
  ) {
    return sendSuccessResponse(
      new SerializedTask(
        await this.studyPlannerService.createTask(id, addTaskDto),
      ),
    );
  }

  // TODO: Pipe need to return custom error message
  @Patch(':task_id')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiOperation({ summary: 'Update a task' })
  @ApiOkResponse({
    description: 'Task has been successfully updated',
    schema: swaggerSuccessExample(null, CommonTask),
  })
  @ApiBadRequestResponse({
    description: 'Bad request. request parameters have something wrong',
    schema: swaggerSuccessExample(null, ErrorScheme),
  })
  async updateTask(
    @GetCurrentUser('user_id') userId,
    @Param(
      'task_id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return sendSuccessResponse(
      new SerializedTask(
        await this.studyPlannerService.updateTask(
          userId,
          taskId,
          updateTaskDto,
        ),
      ),
    );
  }

  // TODO: Pipe need to return custom error message
  @Delete(':task_id')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiOkResponse({
    description: 'Task has been successfully deleted',
    schema: swaggerSuccessExample(null, DeleteTaskExample),
  })
  @ApiBadRequestResponse({
    description: 'Bad request. request parameters have something wrong',
    schema: swaggerSuccessExample(null, ErrorScheme),
  })
  async deleteTask(
    @GetCurrentUser('user_id') userId,
    @Param(
      'task_id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    taskId: number,
  ) {
    return sendSuccessResponse(
      await this.studyPlannerService.deleteTask(userId, taskId),
    );
  }
}
