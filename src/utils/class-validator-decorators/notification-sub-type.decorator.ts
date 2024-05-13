import { Logger } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';
import { NOTIFICATION_TYPES } from 'src/modules/notification/enums/notification-primary-types.enum';
import {
    ARTICLE_NOTIFICATION_TYPES,
    ArticleNotificationType,
} from 'src/modules/notification/enums/article-notifications.enum';

const notificationSubtypeValidatorLogger = new Logger(
    'NotificationSubTypeValidator',
);

export function IsValidNotificationSubType(
    validationOptions?: ValidationOptions,
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isValidNotificationSubType',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: string, args: ValidationArguments) {
                    const PrimaryNotificationType = (args.object as any)
                        ?.PrimaryType;
                    notificationSubtypeValidatorLogger.debug(
                        PrimaryNotificationType,
                    );
                    if (!PrimaryNotificationType) {
                        notificationSubtypeValidatorLogger.error(
                            'PrimaryNotificationType is not provided for IsValidNotificationSubType decorator',
                        );
                        return false;
                    }
                    switch (PrimaryNotificationType) {
                        case NOTIFICATION_TYPES.ARTICLE:
                            const validArticleNotificationSubTypes =
                                Object.values(ARTICLE_NOTIFICATION_TYPES);
                            return validArticleNotificationSubTypes.includes(
                                value as ArticleNotificationType<void>,
                            );
                        default:
                            notificationSubtypeValidatorLogger.error(
                                'Invalid Primary Notification Type provided for IsValidNotificationSubType decorator',
                            );
                            return false;
                    }
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a valid subtype to provided notification type`;
                },
            },
        });
    };
}
