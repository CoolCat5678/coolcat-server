import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger.config';
import * as dotenv from 'dotenv';
import { printAppRunningMessage } from './utils/network.utils';

// Interceptor
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = Number(process.env.PORT) || 3000;

  app.useGlobalInterceptors(new ErrorInterceptor(), new ResponseInterceptor());

  if (process.env.NODE_ENV === 'development') {
    setupSwagger(app);
  }

  await app.listen(port);
  printAppRunningMessage(port);
}

bootstrap();