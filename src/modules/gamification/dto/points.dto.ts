import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PointsDto {
  @ApiProperty({
    description: 'The points to be added to the user',
    required: true,
    example: 20,
  })
  @IsInt()
  @IsNotEmpty()
  Points: number;
}
