import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function IsValidUsername(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isValidUsername',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: string) {
                    const regex = /^[a-z0-9_.]{3,}$/i;
                    return regex.test(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must contain only letters, numbers, dots, underscores and at least 3 characters length.`;
                },
            },
        });
    };
}
