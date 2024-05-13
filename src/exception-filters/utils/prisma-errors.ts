import { HttpStatus } from '@nestjs/common';

export const PrismaErrorMessage = {
    P2002: 'unique constraint failed',
    P2003: 'a foreign key constraint failed',
    P2005: 'invalid field value',
    P2025: 'An operation failed because it depends on one or more records that were required but not found.',
    P2000: 'input exceeded field size',
};

export const PrismaErrorStatusCode = {
    p2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.BAD_REQUEST,
    P2003: HttpStatus.BAD_REQUEST,
    P2005: HttpStatus.BAD_REQUEST,
    P2025: HttpStatus.NOT_FOUND,
};
