import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigSchema } from 'src/utils/config-validation.schema';

@Injectable()
export class AiServiceHttpConfig implements HttpModuleOptionsFactory {
    constructor(private readonly configService: ConfigService<ConfigSchema>) {}
    createHttpOptions(): HttpModuleOptions {
        return {
            baseURL: this.configService.get('AI_SERVICE_BASE_URL'),
            timeout: 20000,
            maxRedirects: 5,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mujedd/1.0 (https://www.mujedd.live)',
            },
        };
    }
}
