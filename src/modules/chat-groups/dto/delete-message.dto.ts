import { ApiProperty } from '@nestjs/swagger';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';
import { IsGteZero } from 'src/utils/class-validator-decorators';

export class DeleteMessageDto {
    @ApiProperty({
        example: 1,
        description: 'The ID of the message',
    })
    @ToInteger()
    @IsGteZero()
    MessageID: number;
}
