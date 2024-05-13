import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';
import { IsGteZero } from 'src/utils/class-validator-decorators';
import { IsValidNotificationSubType } from 'src/utils/class-validator-decorators/notification-sub-type.decorator';
import { IsValidPrimaryNotificationType } from 'src/utils/class-validator-decorators/notification-type.decorator';

export class ViewNotificationDto {
    @ApiProperty({
        example: 1,
        description:
            'The ID of the notification in case of notifications with composite IDs its the one directly related to the notification entity e.g. article_id, comment_id, etc. for article its article_id',
    })
    @ToInteger()
    @IsGteZero()
    ID: number;

    @ApiProperty({
        example: 'article-notification',
        description:
            'The primary type of the notification e.g. article-notification',
    })
    @IsString()
    @IsNotEmpty()
    @IsValidPrimaryNotificationType()
    PrimaryType: string;

    @ApiProperty({
        example: 'comment',
        description:
            'The sub-type of the notification e.g. comment, like, etc. for article notifications',
    })
    @IsString()
    @IsNotEmpty()
    @IsValidNotificationSubType()
    SubType: string;

    @ApiProperty({
        example: 1,
        description:
            'The ID of the notification sender which serves as the second key of the composite key e.g. user_id for article notifications',
    })
    @IsOptional()
    @ToInteger()
    @IsGteZero()
    NotificationSenderID: number;
}
