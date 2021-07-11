import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exeption/http-exeption.filter';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppLogger } from './logger';

async function bootstrap() {
  const fastify = process.env['USE_FASTIFY'] === 'true';
  console.log('framework: ', fastify ? 'fastify' : 'express');

  const logger = new AppLogger();
  let app;
  const port = Number(process.env['PORT']);

  if (fastify) {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({
        logger: false,
      }),
    );
  } else {
    app = await NestFactory.create(AppModule, {
      logger,
    });
    app.useGlobalFilters(new HttpExceptionFilter());
  }

  await app.listen(port);
}

bootstrap();
