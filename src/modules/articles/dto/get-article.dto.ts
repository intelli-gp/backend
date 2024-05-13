import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';

export class GetArticleDto {
    @ApiProperty({ example: 1 })
    @ToInteger()
    @IsNumber()
    articleId: number;
}
