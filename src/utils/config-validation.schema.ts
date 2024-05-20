import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

export class ConfigSchema {
    @IsNotEmpty()
    @IsString()
    PORT: string;

    @IsString()
    FRONT_URL: string;

    @IsString()
    FRONT_ORIGIN: string;

    @IsString()
    SERVER_URL: string;

    @IsNotEmpty()
    @IsString()
    DATABASE_URL: string;

    @IsNotEmpty()
    @IsString()
    DATABASE_HOST: string;

    @IsNotEmpty()
    @IsString()
    DATABASE_PORT: string;

    @IsNotEmpty()
    @IsString()
    DATABASE_NAME: string;

    @IsNotEmpty()
    @IsString()
    DATABASE_USER_NAME: string;

    @IsNotEmpty()
    @IsString()
    DATABASE_USER_PASSWORD: string;

    @IsNotEmpty()
    @IsString()
    ACCESS_TOKEN_SECRET: string;

    @IsNotEmpty()
    @IsString()
    REFRESH_TOKEN_SECRET: string;

    @IsNotEmpty()
    @IsString()
    REFRESH_TOKEN_EXPIRATION_TIME: string;

    @IsNotEmpty()
    @IsString()
    ACCESS_TOKEN_EXPIRATION_TIME: string;

    @IsNotEmpty()
    @IsString()
    TWO_FACTOR_AUTHENTICATION_APP_NAME: string;

    @IsNotEmpty()
    @IsString()
    GOOGLE_CLIENT_ID: string;

    @IsNotEmpty()
    @IsString()
    GOOGLE_CLIENT_SECRET: string;

    @IsNotEmpty()
    @IsString()
    GOOGLE_CALLBACK_URL: string;

    @IsNotEmpty()
    @IsString()
    UDEMY_API_BASE_URL: string;

    @IsNotEmpty()
    @IsString()
    UDEMY_AUTH: string;

    @IsNotEmpty()
    @IsString()
    LINKEDIN_CLIENT_ID: string;

    @IsNotEmpty()
    @IsString()
    LINKEDIN_CLIENT_SECRET: string;

    @IsNotEmpty()
    @IsString()
    LINKEDIN_CALLBACK_URL: string;

    @IsNotEmpty()
    @IsString()
    ENABLE_SWAGGER: string;

    @IsNotEmpty()
    @IsString()
    REDIS_HOST: string;

    @IsNotEmpty()
    @IsString()
    REDIS_PORT: string;

    @IsNotEmpty()
    @IsString()
    MAIL_USERNAME: string;

    @IsNotEmpty()
    @IsString()
    MAIL_PASSWORD: string;

    @IsNotEmpty()
    @IsString()
    ELASTIC_HOST: string;

    @IsNotEmpty()
    @IsString()
    ELASTIC_USER: string;

    @IsNotEmpty()
    @IsString()
    ELASTIC_PASSWORD: string;

    @IsNotEmpty()
    @IsString()
    KIBANA_PASSWORD: string;

    @IsNotEmpty()
    @IsString()
    STACK_VERSION: string;

    @IsNotEmpty()
    @IsString()
    CLUSTER_NAME: string;

    @IsNotEmpty()
    @IsString()
    LICENSE: string;

    @IsNotEmpty()
    @IsString()
    ES_PORT: string;

    @IsNotEmpty()
    @IsString()
    KIBANA_PORT: string;

    @IsNotEmpty()
    @IsString()
    MEM_LIMIT: string;

    @IsNotEmpty()
    @IsString()
    RECOMMENDER_API_KEY: string;

    @IsNotEmpty()
    @IsString()
    RECOMMENDER_BASE_URL: string;

    @IsNotEmpty()
    @IsString()
    AI_SERVICE_BASE_URL: string;

    @IsNotEmpty()
    @IsString()
    STRIPE_SECRET_KEY: string;

    @IsNotEmpty()
    @IsString()
    STRIPE_CURRENCY: string;
}

export function validateConfig(config: ConfigSchema) {
    const validatedConfig = plainToInstance(ConfigSchema, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig as ConfigSchema;
}
