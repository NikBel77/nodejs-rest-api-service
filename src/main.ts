import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './exeption/http-exeption.filter';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, {
//     logger: ['error', 'warn'],
//   });
//   app.useGlobalFilters(new HttpExceptionFilter());
//   await app.listen(4000);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(4000);
}
bootstrap();
