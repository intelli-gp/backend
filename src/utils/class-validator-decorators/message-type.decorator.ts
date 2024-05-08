import { MessageType } from '../enums';
import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function IsValidMessageType(
    validationOptions?: ValidationOptions,
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isValidMessageType',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    return Object.values(MessageType).includes(value);
                },
                defaultMessage(args: ValidationArguments) {
                    const validValues = Object.values(MessageType).join(', ');
                    return `${args.property} must be one of: ${validValues}.`;
                },
            },
        });
    };
}
