import { IsString, IsNotEmpty } from 'class-validator';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';
import { IsGteZero } from 'src/utils/class-validator-decorators';

export class CreateMessageDto {
  // TODOL add more validation here for safety or escape the content
  @IsNotEmpty()
  @IsString()
  Content: string;

  @ToInteger()
  @IsGteZero()
  GroupID: number;
}
