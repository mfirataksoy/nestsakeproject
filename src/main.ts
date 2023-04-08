import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Custom CORS configuration
  app.enableCors({
    origin: '*', // Replace '*' with your frontend domain or an array of domains allowed
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  const documentConfig = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('keepsake')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('docs', app, document);

  config.update({
    accessKeyId: 'AKIA3AWEPLFCPH4AEEPA',
    secretAccessKey: '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',
    region: 'us-east-1',
  });

  await app.listen(3002);
}

bootstrap();
