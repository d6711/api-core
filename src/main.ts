import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // loại field không được khai báo decorator
    forbidNonWhitelisted: true, // error với field không có decorator
    transform: true, // tự convert datatype
  }))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
