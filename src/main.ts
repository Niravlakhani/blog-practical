import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidUnknownValues: false }),
  );
  const config = new DocumentBuilder()
    .addBasicAuth()
    .addBearerAuth()
    .setTitle('BLOG')
    .setDescription('Backend APIs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('blog', app, document);
  const port = process.env.PORT || 3010;

  app.enableCors({
    origin: 'http://localhost:3000', // Change this to the origin of your frontend application
    credentials: false, // Optional: Enable cookies and authentication headers
  });
  await app.listen(port);
}
bootstrap();
