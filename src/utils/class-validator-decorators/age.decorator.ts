import { Logger } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidAge(
  validAge: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidAge',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(dateString: string) {
          const today = new Date();
          const birthDate = new Date(dateString);
          const actualAge = today.getFullYear() - birthDate.getFullYear();
          return actualAge >= validAge;
        },
        defaultMessage() {
          return `User must be at least ${validAge} years old`;
        },
      },
    });
  };
}
