import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import CustomLogger from './log/services/customLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    // logger: ['error', 'warn', 'log', 'verbose', 'debug'],
  });
  app.useLogger(app.get(CustomLogger));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
