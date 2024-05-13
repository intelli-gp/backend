import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SecondFactorRtGuard extends AuthGuard('jwt-refresh-2fa') {
    constructor() {
        super();
    }
}
