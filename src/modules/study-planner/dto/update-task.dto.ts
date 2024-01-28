import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Matches, MaxLength } from 'class-validator';

export default class UpdateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    maxLength: 255,
    required: false,
    example: 'task 1',
  })
  @IsOptional()
  @MaxLength(255)
  Title: string;

  @ApiProperty({
    description: 'The description of the task',
    maxLength: 255,
    required: false,
    example: 'task 1 for CS256 assignment',
  })
  @IsOptional()
  Description: string;

  @ApiProperty({
    description: 'The start date of the task in the format yyyy-mm-ddThh:mm',
    pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}$',
    required: false,
    example: '2021-01-01T00:00',
  })
  @Matches(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/, {
    message: 'Invalid date format. Must be in the format yyyy-mm-ddThh:mm',
  })
  @IsOptional()
  StartDate: string;

  @ApiProperty({
    description: 'The due date of the task in the format yyyy-mm-ddThh:mm',
    pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}$',
    required: false,
    example: '2021-01-01T00:00',
  })
  @Matches(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/, {
    message: 'Invalid date format. Must be in the format yyyy-mm-ddThh:mm',
  })
  @IsOptional()
  DueDate: string;

  @ApiProperty({
    description: 'The status of the task',
    maxLength: 255,
    required: false,
    example: 'in progress',
  })
  @IsOptional()
  @MaxLength(255)
  Status: string;
}
