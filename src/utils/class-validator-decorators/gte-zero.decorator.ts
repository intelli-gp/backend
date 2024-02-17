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
          return `${args.property} must be a number greater than or equal 0.`;
        },
      },
    });
  };
}
