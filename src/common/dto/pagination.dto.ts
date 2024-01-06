import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';
import { IsGteZero } from 'src/utils/class-validator-decorators/gte-zero.decorator';

export class PaginationDto {
  @ApiProperty({ example: 10, description: 'Number of items per page' })
  @IsOptional()
  @ToInteger()
  @IsPositive()
  limit: number;

  @ApiProperty({ example: 1, description: 'Page number' })
  @IsOptional()
  @ToInteger()
  @IsGteZero()
  offset: number;
}
