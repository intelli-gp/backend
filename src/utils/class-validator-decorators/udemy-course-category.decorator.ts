import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { udemyCourseCategories } from 'src/modules/courses/constants';

/**
 * checks if the course category is a valid udemy course category from constants
 * @param validationOptions
 * @returns
 */
export function IsValidUdemyCourseCategory(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidUdemyCourseCategory',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          return udemyCourseCategories.includes(value as any);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid udemy category.`;
        },
      },
    });
  };
}
