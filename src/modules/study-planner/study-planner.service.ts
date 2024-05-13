import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import AddTaskDto from './dto/create-task.dto';
import { PaginationDto } from 'src/common/dto';
import UpdateTaskDto from './dto/update-task.dto';

@Injectable()
export class StudyPlannerService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTasks(id: number, paginatedData: PaginationDto) {
    const tasks = await this.prismaService.task
      .findMany({
        where: { user_id: id },
        take: paginatedData.limit,
        skip: paginatedData.offset,
      })
      .catch((err) => {
        throw new BadRequestException({ error: err });
      });

    return tasks;
  }

  async getTask(userId: number, taskId: number) {
    const task = await this.prismaService.task
      .findUnique({
        where: { task_id: taskId, user_id: userId },
      })
      .catch((err) => {
        throw new BadRequestException({ error: err });
      });

    if (!task) throw new BadRequestException({ message: 'Task not found' });
    return task;
  }

  async createTask(id: number, addTaskDto: AddTaskDto) {
    const start_date = new Date(addTaskDto.StartDate);
    const due_date = new Date(addTaskDto.DueDate);

    // check if both dates are valid
    await this.checkValidDate(id, start_date, due_date);

    const task = await this.prismaService.task
      .create({
        data: {
          title: addTaskDto.Title,
          description: addTaskDto.Description,
          start_date,
          due_date,
          color: addTaskDto.Color,
          status: addTaskDto.Status,
          user_id: id,
        },
      })
      .catch((err) => {
        throw new BadRequestException({ error: err });
      });

    return task;
  }

  async updateTask(
    userId: number,
    taskId: number,
    updateTaskDto: UpdateTaskDto,
  ) {
    const { StartDate, DueDate, Title, Description, Status } = updateTaskDto;
    const updatedTaskData = {};
    if ((StartDate && !DueDate) || (!StartDate && DueDate))
      throw new BadRequestException({
        message: 'when some date is to be updated, the other must be provided',
      });
    else if (StartDate && DueDate) {
      // check if both dates are valid
      await this.checkValidDate(userId, new Date(StartDate), new Date(DueDate));
      updatedTaskData['start_date'] = new Date(StartDate);
      updatedTaskData['due_date'] = new Date(DueDate);
    }

    if (Title) updatedTaskData['title'] = Title;
    if (Description) updatedTaskData['description'] = Description;
    if (Status) updatedTaskData['status'] = Status;
    const task = await this.prismaService.task
      .update({
        where: { task_id: taskId, user_id: userId },
        data: updatedTaskData,
      })
      .catch((err) => {
        if (err.code === 'P2025')
          throw new BadRequestException({ message: "Task doesn't exist" });
        throw new BadRequestException({ error: err });
      });

    if (!task) throw new BadRequestException({ message: 'Task not found' });
    return task;
  }

  async deleteTask(userId: any, taskId: number) {
    const task = await this.prismaService.task
      .delete({
        where: { task_id: taskId, user_id: userId },
      })
      .catch((err) => {
        if (err.code === 'P2025')
          throw new BadRequestException({ message: "Task doesn't exist" });
        throw new BadRequestException({ error: err });
      });

    if (!task) throw new BadRequestException({ message: "Task doesn't exist" });
    return 'Task has been deleted successfully';
  }

  private async checkValidDate(id: number, startDate: Date, dueDate: Date) {
    const start_date = startDate.getTime();
    const due_date = dueDate.getTime();
    const currentDate = new Date().getTime();

    // check if start date is before end date
    if (start_date > due_date)
      throw new BadRequestException({
        message: 'Start date cannot be after due date',
      });

    // check if start date is the same as end date
    if (start_date === due_date)
      throw new BadRequestException({
        message: 'Start date cannot be the same as due date',
      });

    // check if date is not in the past
    if (start_date < currentDate || due_date < currentDate)
      throw new BadRequestException({ message: 'Date cannot be in the past' });

    // not more than 1 months in the future
    const dateAfterMonth = new Date(
      new Date().setMonth(new Date().getMonth() + 1),
    ).getTime();

    if (start_date > dateAfterMonth || due_date > dateAfterMonth)
      throw new BadRequestException({
        message: 'Date cannot be more than 1 months in the future',
      });

    // check if date is not in the interval of other tasks
    const tasks = await this.prismaService.task.findMany({
      where: { user_id: id },
    });

    for (const task of tasks) {
      const taskStartDate = task.start_date.getTime();
      const taskDueDate = task.due_date.getTime();
      // if start date is in the interval of other task
      if (start_date >= taskStartDate && start_date < taskDueDate)
        throw new BadRequestException({
          message: 'start cannot be inside the interval of other tasks',
        });

      // if end date is in the interval of other task
      if (due_date >= taskStartDate && due_date <= taskDueDate)
        throw new BadRequestException({
          message: 'end date cannot be inside the interval of other tasks',
        });

      // if some other task interval is inside this interval
      if (
        start_date <= taskStartDate &&
        due_date >= taskStartDate &&
        due_date >= taskDueDate
      )
        throw new BadRequestException({
          message: 'intervals cannot be inside each other',
        });
    }
  }
}
