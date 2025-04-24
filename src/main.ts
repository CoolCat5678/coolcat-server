import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './common/config/swagger.config';
import { printAppRunningMessage } from './common/utils/printhost.utils';
import * as dotenv from 'dotenv';

// Interceptor
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT) || 3000;

  // Interceptor
  app.useGlobalInterceptors(new ErrorInterceptor(), new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // use swagger
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
    setupSwagger(app);
  }

  await app.listen(port);
  console.log(`App is running in "${process.env.NODE_ENV}" mode.`);
  printAppRunningMessage(port);
}

bootstrap();