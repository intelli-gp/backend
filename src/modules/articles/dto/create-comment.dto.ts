import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: '## Comment content',
    description: 'Comment content in markdown format',
  })
  @MinLength(5)
  @MaxLength(500)
  Content: string;
}
