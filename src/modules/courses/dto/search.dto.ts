import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { PaginationDto } from 'src/common/dto';

export class SearchDto extends PaginationDto {
  @ApiProperty({ description: 'Search query', example: 'Javascript mastery' })
  @IsString()
  @IsNotEmpty()
  query: string;
}
