import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalSerializer } from 'src/auth/local.serializer';
import { GoogleStrategy } from 'src/auth/strategies/google.strategy';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { REDIS_REPOSITORY_OUTBOUND_PORT } from 'src/cache/redis/redis-repository.outbound-port';
import { RedisModule } from 'src/cache/redis/redis.module';
import { RedisRepository } from 'src/cache/redis/redis.repository';
import { CONFIG_SERVICE_OUTBOUND_PORT } from 'src/config/config-service.outbound-port';
import { EnvService } from 'src/config/env.service';
import { AuthController } from 'src/controllers/auth.controller';
import { UserEntity } from 'src/entities/user/user.entity';
import { AUTH_CONTROLLER_INBOUND_PORT } from 'src/inbound-ports/auth/auth-controller.inbound-port';
import { USER_REPOSITORY_OUTBOUND_PORT } from 'src/outbound-ports/user/user-repository.outbound-port';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([UserEntity]),
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_CONTROLLER_INBOUND_PORT,
      useClass: AuthService,
    },
    {
      provide: USER_REPOSITORY_OUTBOUND_PORT,
      useClass: UserRepository,
    },
    {
      provide: REDIS_REPOSITORY_OUTBOUND_PORT,
      useClass: RedisRepository,
    },
    {
      provide: CONFIG_SERVICE_OUTBOUND_PORT,
      useClass: EnvService,
    },
    AuthService,
    LocalStrategy,
    LocalSerializer,
    GoogleStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
