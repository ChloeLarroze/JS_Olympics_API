import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; //dto validation

const PORT = process.env.PORT ?? 3000; //8080 or 3000

async function bootstrap() {

  //CORS enable for front app
  const app = await NestFactory.create(AppModule); //former without front : const app = await NestFactory.create(AppModule);
  
  // Configure CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://chloelarroze.github.io',  // github domain
      'https://chloelarroze.github.io/JS_Olympics_API'  
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe({
      transform: true,
    })); //enable validation pipe (DTO)
  await app.listen(PORT);
  console.log(`Server running on http://localhost:${PORT}`);
}
bootstrap(); //runs the server

