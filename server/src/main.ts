import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 3001; 
  await app.listen(port);
  
  console.log(`Server running on port ${port}`);
}

bootstrap();
