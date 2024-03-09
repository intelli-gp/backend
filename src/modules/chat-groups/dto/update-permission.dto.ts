import { ApiProperty } from '@nestjs/swagger';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';
import { IsGteZero } from 'src/utils/class-validator-decorators';
import { IsValidChatGroupPermission } from 'src/utils/class-validator-decorators/chat-group-permissions.decorator';
import { GroupUserTypeEnum } from '@prisma/client';

export class UpdatePermissionDto {
  @ApiProperty({
    example: 1,
    description: 'The Id of the user',
    required: true,
  })
  @ToInteger()
  @IsGteZero()
  TargetID: number;

  @ApiProperty({
    example: 1,
    description: 'The Id of the user',
    required: true,
  })
  @IsValidChatGroupPermission()
  permissionLevel: GroupUserTypeEnum;
}
