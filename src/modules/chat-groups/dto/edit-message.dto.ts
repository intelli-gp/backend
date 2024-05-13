import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';
import { IsGteZero } from 'src/utils/class-validator-decorators';

export class EditMessageDto {
    @ApiProperty({
        example: 'Hello World!',
        description: 'The content of the message',
    })
    @IsString()
    Content: string;

    @ApiProperty({
        example: 1,
        description: 'The ID of the message',
    })
    @ToInteger()
    @IsGteZero()
    MessageID: number;
}
