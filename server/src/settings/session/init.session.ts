import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import { Redis } from 'ioredis';

export function setUpSession(app: INestApplication): void {
  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get('REDIS_PORT');
  const host = configService.get('REDIS_HOST');

  const RedisStore = connectRedis(session);

  const client = new Redis({
    host,
    port,
  });

  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      saveUninitialized: false,
      resave: false,
      store: new RedisStore({
        client: client,
        ttl: 30,
      }),
      cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 40000,
        path: '/',
      },
    }),
  );
}
