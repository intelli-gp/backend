import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ example: 10, description: 'Number of items per page' })
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty({ example: 1, description: 'Page number' })
  @IsOptional()
  @IsPositive()
  offset: number;
}
