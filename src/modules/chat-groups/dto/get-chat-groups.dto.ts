import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';
import { IsGteZero } from 'src/utils/class-validator-decorators';

export class GetChatGroupsDto extends PaginationDto {
  @ApiProperty({
    example: 1,
    description: 'The Id of the chatgroup',
    required: false,
  })
  @IsOptional()
  @ToInteger()
  @IsGteZero()
  ID?: number;
}

export class GetSingleChatGroupDto {
  @ApiProperty({
    example: 1,
    description: 'The Id of the chatgroup',
    required: true,
  })
  @ToInteger()
  @IsGteZero()
  ID: number;
}
