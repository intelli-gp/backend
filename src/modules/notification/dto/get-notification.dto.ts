import { IsNotEmpty } from 'class-validator';
import { IsGteZero } from '../../../utils/class-validator-decorators';
import { ToInteger } from 'src/utils/class-transformer-decorators/int-transformer.decorator';
export class GetNotificationDto {
    @IsNotEmpty()
    @ToInteger()
    @IsGteZero()
    notificationID: number;
}
