import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ToInteger } from '../../../utils/class-transformer-decorators/int-transformer.decorator';

export class IdDto {
  @ApiProperty({
    example: '1',
    description:
      'The id of the {Article | Course | Group | User} to get its recommendations',
  })
  @IsNumber()
  @ToInteger()
  @IsNotEmpty()
  id: number;
}
