import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto';
import { IsValidUdemyCourseCategory } from 'src/utils/class-validator-decorators/udemy-course-category.decorator';

export class SearchDto extends PaginationDto {
  @ApiProperty({ description: 'Search query', example: 'Javascript mastery' })
  @IsString()
  @IsNotEmpty()
  query: string;

  @ApiProperty({
    description: 'Category of the course',
    example: 'Development',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsValidUdemyCourseCategory()
  category?: string;
}
