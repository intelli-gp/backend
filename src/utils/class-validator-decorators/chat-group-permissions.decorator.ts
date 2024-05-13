import { GroupUserTypeEnum } from '@prisma/client';
import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function IsValidChatGroupPermission(
    validationOptions?: ValidationOptions,
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isValidChatGroupPermission',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    return Object.values(GroupUserTypeEnum).includes(value);
                },
                defaultMessage(args: ValidationArguments) {
                    const validValues =
                        Object.values(GroupUserTypeEnum).join(', ');
                    return `${args.property} must be one of: ${validValues}.`;
                },
            },
        });
    };
}
