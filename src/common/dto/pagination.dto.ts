import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ example: 10, description: 'Number of items per page' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  limit: number;

  @ApiProperty({ example: 1, description: 'Page number' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  offset: number;
}
