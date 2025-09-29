import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; //dto validation

const PORT = process.env.PORT ?? 3000; //8080 or 3000

async function bootstrap() {

  //CORS enable for front app
  const app = await NestFactory.create(AppModule, { cors: true }); //former without front : const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
      transform: true,
    })); //enable validation pipe (DTO)
  await app.listen(PORT);
  console.log(`Server running on http://localhost:${PORT}`);
}
bootstrap(); //runs the server

