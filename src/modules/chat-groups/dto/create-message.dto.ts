import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';
import { IsGteZero, IsValidMessageType } from 'src/utils/class-validator-decorators';
import { MessageType } from 'src/utils/enums';

export class CreateMessageDto {
  // TODOL add more validation here for safety or escape the content
  @ApiProperty({
    example: 'TEXT',
    description: 'The type of the message',
  })
  @IsNotEmpty()
  @IsString()
  @IsValidMessageType()
  Type: MessageType;
  
  @ApiProperty({
    example: 'Hello World!',
    description: 'The content of the message',
  })
  @IsNotEmpty()
  @IsString()
  Content: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the message that is being replied to',
  })
  @ToInteger()
  @IsGteZero()
  @IsOptional()
  RepliedToMessageID: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the group the message belongs to',
  })
  @ToInteger()
  @IsGteZero()
  GroupID: number;
}
