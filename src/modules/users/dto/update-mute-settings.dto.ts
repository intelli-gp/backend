import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateMuteSettingsDto {
    @ApiProperty({
        description: 'Mute all notifications',
        example: true,
    })
    @IsBoolean()
    IsAllNotificationsMuted: boolean;

    @ApiProperty({
        description: 'Mute group notifications',
        example: true,
    })
    @IsBoolean()
    IsGroupNotificationsMuted: boolean;

    @ApiProperty({
        description: 'Mute article notifications',
        example: true,
    })
    @IsBoolean()
    IsArticleNotificationsMuted: boolean;

    @ApiProperty({
        description: 'Mute follow notifications',
        example: true,
    })
    @IsBoolean()
    IsFollowNotificationsMuted: boolean;
}
