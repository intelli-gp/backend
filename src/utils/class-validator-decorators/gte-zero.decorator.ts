import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsGteZero(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isGteZero',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: number) {
          return value >= 0;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be between 8 and 30 characters in length.`;
        },
      },
    });
  };
}
