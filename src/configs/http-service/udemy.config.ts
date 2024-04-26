import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpUdemyConfigService implements HttpModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: this.configService.get('UDEMY_API_BASE_URL'),
      timeout: 20000,
      maxRedirects: 5,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.configService.get('UDEMY_AUTH'),
        'User-Agent': 'Mujedd/1.0 (https://www.mujedd.live)',
      },
    };
  }
}
