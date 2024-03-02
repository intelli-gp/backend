import { ApiProperty } from '@nestjs/swagger';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';
import { IsGteZero } from 'src/utils/class-validator-decorators';

export class JoinChatGroupDto {
  @ApiProperty({
    example: 1,
    description: 'The Id of the chatgroup',
  })
  @ToInteger()
  @IsGteZero()
  ChatGroupId: number;
}
