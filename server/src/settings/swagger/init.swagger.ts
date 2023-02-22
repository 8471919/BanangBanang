import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setUpSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .addCookieAuth('connect.sid')
    .setTitle('BanangBanang API docs')
    .setDescription('배낭배낭 API 문서입니다.')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
