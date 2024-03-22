import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsValidUsername } from 'src/utils/class-validator-decorators';

export class GetSingleUserDto {
  @ApiProperty({ required: true, example: 'John32' })
  @IsNotEmpty()
  @IsValidUsername()
  Username: string;
}
