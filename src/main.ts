import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exeption/http-exeption.filter';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const fastify = process.env['USE_FASTIFY'] === 'true';
  console.log('framework: ', fastify ? 'fastify' : 'express');

  let app;
  const port = Number(process.env['PORT']);

  if (fastify) {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({
        logger: true,
      }),
    );
  } else {
    app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn'],
    });
    app.useGlobalFilters(new HttpExceptionFilter());
  }

  await app.listen(port);
}

bootstrap();
