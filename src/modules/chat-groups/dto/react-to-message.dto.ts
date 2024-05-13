import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';
import { IsGteZero } from 'src/utils/class-validator-decorators';

export class ReactToMessageDto {
    @ApiProperty({
        example: 'like',
        description: 'The reaction to the message',
    })
    @IsString()
    Reaction: string;

    @ApiProperty({
        example: 1,
        description: 'The ID of the message',
    })
    @ToInteger()
    @IsGteZero()
    MessageID: number;
}
