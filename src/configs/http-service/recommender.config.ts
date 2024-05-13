import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpRecommenderConfigService implements HttpModuleOptionsFactory {
    constructor(private readonly configService: ConfigService) {}
    createHttpOptions(): HttpModuleOptions {
        return {
            baseURL: this.configService.get('RECOMMENDER_BASE_URL'),
            timeout: 20000,
            maxRedirects: 5,
            headers: {
                api_key: this.configService.get('RECOMMENDER_API_KEY'),
            },
        };
    }
}
