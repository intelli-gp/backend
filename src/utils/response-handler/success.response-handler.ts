import { Response } from 'express';

export function sendRefreshToken(res: Response, refreshToken: string) {
    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
}

export function sendSuccessResponse(data: any) {
    return {
        data,
    };
}
