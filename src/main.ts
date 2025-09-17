import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//we'll use the file .env in .gitignore to store environment variables
//import * as dotenv from 'dotenv';
//dotenv.config();

const PORT =  3000; //move to .env file TODO

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log(`Server running on http://localhost:${PORT}`);
}
bootstrap();

