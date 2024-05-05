import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';
import { IsGteZero } from 'src/utils/class-validator-decorators';
import { SerializedAttachment } from '../serialized-types/messages/attachment.serializer';

export class CreateMessageDto {
  // TODOL add more validation here for safety or escape the content
  @IsNotEmpty()
  @IsString()
  Content: string;
  
  @IsArray()
  Attachment?: SerializedAttachment[];

  @ToInteger()
  @IsGteZero()
  GroupID: number;
}
