import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './common/adapters/redis-io.adapter';
import { loggerMiddleware } from './common/middlewares/logger.middleware';
import { ConfigService } from './common/config/config.service';
import { setupSwagger } from './common/swagger';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = '/api';
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPrefix);
  app.use(helmet());
  app.use(loggerMiddleware);
  
  const configService = app.get(ConfigService);
  const redisIoAdapter: any = new RedisIoAdapter(configService);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);
  
  setupSwagger(app);
  await app.listen(AppModule.port);
  // for Hot Module Reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // Log current url of app and documentation
  let baseUrl = app.getHttpServer().address().address;
  if (baseUrl === '0.0.0.0' || baseUrl === '::') {
    baseUrl = 'localhost';
  }
  const url = `http://${baseUrl}:${AppModule.port}${globalPrefix}`;
  console.log(`Listening to ${url}`);
  if (AppModule.isDev) {
    console.log(`API Documentation available at ${url}/docs`);
  }
}
bootstrap();
