import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { FailurePayload } from './types/failure-payload';

export function sendFailureResponse(
    res: Response,
    statusCode: HttpStatus,
    data: FailurePayload,
) {
    res.status(statusCode).json({
        data,
    });
}
