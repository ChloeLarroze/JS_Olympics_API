//src/main.ts

//imports
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; //dto validation

//static html file 
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';


//===================
const PORT = process.env.PORT ?? 3000; //8080 or 3000
//===================

async function bootstrap() {
  //const app = await NestFactory.create(AppModule); 
  const app = await NestFactory.create<NestExpressApplication>(AppModule); //needs to be typed for static files handling
  
  //CORS 
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://chloelarroze.github.io',  // github domain
      'https://chloelarroze.github.io/JS_Olympics_API'  
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  //validatio pipe (dto)
  app.useGlobalPipes(new ValidationPipe({
      transform: true,
    })); //enable validation pipe (DTO)

  //static files handling
  app.useStaticAssets(join(__dirname, '..'), {
    index: 'index.html'
  });
  
  await app.listen(PORT);
  console.log(`Server running on http://localhost:${PORT}`);
}
bootstrap(); //runs the server

