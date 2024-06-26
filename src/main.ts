import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

async function bootstrap() {
    const config = new ConfigService();

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: [config.get('FRONT_ORIGIN')],
        credentials: true,
    });
    app.use(cookieParser());
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            // transform: true,
        }),
    );

    if (config.get('ENABLE_SWAGGER') === 'true') {
        const swaggerConfig = new DocumentBuilder()
            .setTitle('Mujedd')
            .setDescription('The Mujedd API documentation')
            .setVersion('1.0')
            .addTag('Mujedd')
            .addBearerAuth()
            .build();

        const document = SwaggerModule.createDocument(app, swaggerConfig);

        SwaggerModule.setup('/6YrzxCg81s/swagger-docs', app, document, {
            swaggerOptions: {
                docExpansion: 'none',
                filter: true,
                showRequestDuration: true,
            },

            customSiteTitle: 'Mujedd API Documentation',
        });

        // Generate Swagger json schema
        const jsonOutput = JSON.stringify(document, null, 2);
        fs.writeFileSync('swagger.json', jsonOutput);
    }

    await app.listen(config.get('PORT'));
}

bootstrap();
