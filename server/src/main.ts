import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUpSession } from './settings/session/init.session';
import { setUpSwagger } from './settings/swagger/init.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;

  setUpSession(app);

  setUpSwagger(app);

  await app.listen(port);
  console.log(`Server is open on port ${port}`);
}
bootstrap();
