import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  dotenv.config();

  const swagger_config = new DocumentBuilder()
    .setTitle('Shop Api')
    .setDescription(
      'An API for a dummy shop, only basic functionality implemented',
    )
    .setVersion('1.0')
    .addTag('shop')
    .build();
  const document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
