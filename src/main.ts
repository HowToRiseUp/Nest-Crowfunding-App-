import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  const port = configService.get('PORT');
  app.useGlobalPipes(new ValidationPipe());

  const reflector: Reflector = new Reflector();
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  const corsOptions: CorsOptions = {
    origin: ['http://127.0.0.1:5173'], // Replace this with your frontend URL
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
    credentials: true, // Allow cookies and credentials to be sent cross-origin
  };
  app.enableCors(corsOptions);

  await app.listen(port);
}
bootstrap();
