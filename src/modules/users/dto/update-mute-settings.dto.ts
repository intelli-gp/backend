import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateMuteSettingsDto {
    @ApiProperty({
        description: 'Mute all notifications',
        example: true,
    })
    @IsBoolean()
    @IsOptional()
    IsAllNotificationsMuted: boolean;

    @ApiProperty({
        description: 'Mute group notifications',
        example: true,
    })
    @IsBoolean()
    @IsOptional()
    IsGroupNotificationsMuted: boolean;

    @ApiProperty({
        description: 'Mute article notifications',
        example: true,
    })
    @IsBoolean()
    @IsOptional()
    IsArticleNotificationsMuted: boolean;

    @ApiProperty({
        description: 'Mute follow notifications',
        example: true,
    })
    @IsBoolean()
    @IsOptional()
    IsFollowNotificationsMuted: boolean;
}
