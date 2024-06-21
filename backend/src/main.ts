import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  // const io = new IoAdapter(app);
  // app.useWebSocketAdapter(io);

  await app.listen(3000);
}
bootstrap();
