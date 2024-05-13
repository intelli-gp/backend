import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';

export class DeleteArticleDto {
    @ApiProperty({ example: 1, description: 'Article id' })
    @ToInteger()
    @IsNumber()
    articleId: number;
}
