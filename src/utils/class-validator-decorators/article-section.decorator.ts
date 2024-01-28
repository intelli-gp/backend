import { Logger } from '@nestjs/common';
import { registerDecorator, ValidationOptions } from 'class-validator';
import { ArticleSectionType } from '../enums';

export function IsValidArticleSections(validationOptions?: ValidationOptions) {
  let errorMessage = '';
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidArticleSections',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(sections: string[][]) {
          const sectionTypeRegex = new RegExp(
            `^(${Object.values(ArticleSectionType).join('|')})$`,
          );
          if (!Array.isArray(sections)) {
            errorMessage = `Sections must be an array`;
            Logger.error(errorMessage);

            return false;
          }
          for (const section of sections) {
            const [sectionValue, sectionType] = section;
            if (typeof sectionValue !== 'string') {
              errorMessage = `Section Value must be a string`;
              Logger.error(errorMessage);

              return false;
            } else if (!sectionTypeRegex.test(sectionType)) {
              errorMessage = `Section Types must be one of the following: ${Object.values(
                ArticleSectionType,
              )}`;
              Logger.error(`Invalid section type: ${sectionType}`);
              return false;
            }
          }
          return true;
        },
        defaultMessage() {
          return errorMessage;
        },
      },
    });
  };
}
