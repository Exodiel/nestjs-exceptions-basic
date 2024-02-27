/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilterFilter } from './core/http-exception-filter/http-exception-filter.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilterFilter());
  await app.listen(3001);
}
bootstrap();
