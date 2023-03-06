import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import { Redis } from 'ioredis';
import * as passport from 'passport';

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
        secure: false, // TODO: https로 사용할거면 true로 바꿔야한다. 지금은 로컬에서 사용하니 false로 해둔다.
        maxAge: 1000 * 60 * 30, // 쿠키 유효기간: 30분
        path: '/',
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
}
