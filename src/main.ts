import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
  });
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text({ type: 'ejs' }));
  app.use(bodyParser.json());
  app.useStaticAssets(join(__dirname, '..', '/assets'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.enableCors();
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
