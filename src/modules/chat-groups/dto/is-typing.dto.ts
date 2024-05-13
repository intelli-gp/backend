import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';
import { IsGteZero } from 'src/utils/class-validator-decorators';

export class IsTypingDto {
    @ApiProperty({
        example: true,
        description: 'Whether the user is currently typing or not',
    })
    @IsBoolean()
    IsTyping: boolean;

    @ApiProperty({
        example: 1,
        description: 'The ID of the chat group',
    })
    @ToInteger()
    @IsGteZero()
    GroupID: number;
}
