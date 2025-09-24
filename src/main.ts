import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; //dto validation

//we'll use the file .env in .gitignore to store environment variables
//import * as dotenv from 'dotenv';
//dotenv.config();

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //enable validation pipe
  await app.listen(PORT);
  console.log(`Server running on http://localhost:${PORT}`);
}
bootstrap();

