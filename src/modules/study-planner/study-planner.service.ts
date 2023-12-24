import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import AddTaskDto from './dto/add-task.dto';

@Injectable()
export class StudyPlannerService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTask(id: number, addTaskDto: AddTaskDto) {
    const start_date = new Date(addTaskDto.startDate);
    const due_date = new Date(addTaskDto.startDate);

    // check if date is valid
    await this.checkValidDate(id, new Date(start_date), true);
    await this.checkValidDate(id, new Date(due_date), false);

    const task = await this.prismaService.task
      .create({
        data: {
          title: addTaskDto.title,
          description: addTaskDto.description,
          start_date,
          due_date,
          status: addTaskDto.status,
          user_id: id,
        },
      })
      .catch((err) => {
        console.log(err);
      });

    if (!task) throw new BadRequestException();
    return task;
  }

  private async checkValidDate(id: number, date: Date, isStartDate: boolean) {
    // check if date is not in the past
    if (date < new Date())
      throw new BadRequestException({ message: 'Date cannot be in the past' });

    // not more than 1 months in the future
    if (date > new Date(new Date().setMonth(new Date().getMonth() + 1)))
      throw new BadRequestException({
        message: 'Date cannot be more than 1 months in the future',
      });

    // check if date is not in the interval of other tasks
    const tasks = await this.prismaService.task.findMany({
      where: { user_id: id },
    });

    for (const task of tasks) {
      if (date >= task.start_date && date <= task.due_date)
        throw new BadRequestException({
          message: 'Date cannot be in the interval of other tasks',
        });
    }
  }
}
