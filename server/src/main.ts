import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, enableDebugMessages: true }),
  );
  await app.listen(8080);

  console.log('');
  console.log('-------------------------------------------------------------');
  console.log('                    ToDo-Backend läuft                       ');
  console.log('-------------------------------------------------------------');
  console.log('       Liste abrufen:     http://localhost:8080/todolist     ');
  console.log('       Frontend aufrufen: http://localhost:4200              ');
  console.log('-------------------------------------------------------------');
}
bootstrap();