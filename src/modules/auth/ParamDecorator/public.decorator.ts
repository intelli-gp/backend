import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const IS_SECOND_FACTOR_PUBLIC_KEY = 'isSecondFactorPublic';

export const Public = () => SetMetadata('isPublic', true);

export const SecondFactorPublic = () =>
    SetMetadata('isSecondFactorPublic', true);
