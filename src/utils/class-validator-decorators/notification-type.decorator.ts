import { Logger } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';
import {
    NOTIFICATION_TYPES,
    NotificationType,
} from 'src/modules/notification/enums/notification-primary-types.enum';

const notificationTypeValidatorLogger = new Logger('NotificationTypeValidator');

export function IsValidPrimaryNotificationType(
    validationOptions?: ValidationOptions,
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isValidPrimaryNotificationType',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: string) {
                    const validNotificationTypes =
                        Object.values(NOTIFICATION_TYPES);
                    return validNotificationTypes.includes(
                        value as NotificationType<void>,
                    );
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a valid primary notification type.`;
                },
            },
        });
    };
}
