import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cors for nestjs
  app.enableCors();

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
