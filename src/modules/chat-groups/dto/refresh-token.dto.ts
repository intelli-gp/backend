import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
    @ApiProperty({
        description: 'Access token',
        example: 'eyJhbGc ...',
    })
    @IsString()
    @IsNotEmpty()
    accessToken: string;
}
