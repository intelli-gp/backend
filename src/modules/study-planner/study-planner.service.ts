import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import AddTaskDto from './dto/add-task.dto';

@Injectable()
export class StudyPlannerService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTask(id: number, addTaskDto: AddTaskDto) {
    const start_date = new Date(addTaskDto.startDate);
    const due_date = new Date(addTaskDto.dueDate);

    // check if date is valid
    await this.checkValidDate(id, start_date, due_date);

    const task = await this.prismaService.task.create({
      data: {
        title: addTaskDto.title,
        description: addTaskDto.description,
        start_date,
        due_date,
        status: addTaskDto.status,
        user_id: id,
      },
    });

    if (!task) throw new BadRequestException();
    return task;
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
      if (start_date >= taskStartDate && start_date <= taskDueDate)
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
