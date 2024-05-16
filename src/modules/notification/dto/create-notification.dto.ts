import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsGteZero } from 'src/utils/class-validator-decorators';
import { IsValidNotificationSubType } from 'src/utils/class-validator-decorators/notification-sub-type.decorator';
import { IsValidPrimaryNotificationType } from 'src/utils/class-validator-decorators/notification-type.decorator';

export class CreateNotificationDto {
    @IsNotEmpty()
    @IsGteZero()
    SenderID: number;

    @IsNotEmpty()
    @IsGteZero()
    ReceiverID: number;

    @IsNotEmpty()
    @IsValidPrimaryNotificationType()
    PrimaryType: string;

    @IsOptional()
    @IsValidNotificationSubType()
    SubType: string;

    @IsNotEmpty()
    @IsGteZero()
    EntityID: number;
}
