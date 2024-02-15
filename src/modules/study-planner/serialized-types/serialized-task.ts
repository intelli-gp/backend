import { ApiProperty } from '@nestjs/swagger';
import { task } from '@prisma/client';

export class SerializedTask {
  @ApiProperty({
    example: 1,
  })
  ID: number;

  @ApiProperty({
    example: 'test title for a task',
  })
  Title: string;

  @ApiProperty({
    example: 'test description for a task',
  })
  Description: string;

  @ApiProperty({
    example: '2021-01-01T00:00',
  })
  StartDate: Date;

  @ApiProperty({
    example: '2021-01-01T03:00',
  })
  DueDate: Date;

  @ApiProperty({
    example: 'in progress',
  })
  Status: string;

  @ApiProperty({
    example: '#123456',
  })
  Color: string;

  constructor(partial: Partial<task>) {
    this.ID = partial.task_id;
    this.Title = partial.title;
    this.Description = partial.description;
    this.Status = partial.status;
    this.StartDate = partial.start_date;
    this.DueDate = partial.due_date;
    this.Color = partial.color;
  }
}
