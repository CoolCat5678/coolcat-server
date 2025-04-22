import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger.config';
import * as os from 'os';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT ?? 3000;

  const networkInterfaces = os.networkInterfaces();
  const ipAddresses: string[] = [];
  for (const interfaceName in networkInterfaces) {
    networkInterfaces[interfaceName]?.forEach((networkInterface) => {
      if (networkInterface.family === 'IPv4' && !networkInterface.internal) {
        ipAddresses.push(networkInterface.address);
      }
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app);
  }

  await app.listen(port);
  const ipList = ['localhost', ...ipAddresses];
  ipList.forEach((ip) => {
    console.log(`App is running at http://${ip}:${port}`);
  });
}

bootstrap();