import { IsGteZero } from 'src/utils/class-validator-decorators';
import { DeleteArticleDto } from './delete-article.dto';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class GetCommentDto extends DeleteArticleDto {
  @ApiProperty({ example: 1, description: 'Comment id' })
  @ToInteger()
  @IsGteZero()
  commentId: number;
}
