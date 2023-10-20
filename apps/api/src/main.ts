import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { RootConfig } from './common/config/root.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // setup swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Elncr API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      filter: true,
      persistAuthorization: true,
      docExpansion: 'none',
      defaultModelExpandDepth: 1,
    },
  });

  app.enableCors();

  // middleware and global pipes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = app.get(RootConfig);
  await app.listen(config.port);
  Logger.log(`🚀 Application is running on: ${await app.getUrl()}`);
}

bootstrap();
