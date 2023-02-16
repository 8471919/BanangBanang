import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { REDIS_REPOSITORY_OUTBOUND_PORT } from 'src/cache/redis/redis-repository.outbound-port';
import { RedisModule } from 'src/cache/redis/redis.module';
import { RedisRepository } from 'src/cache/redis/redis.repository';
import { AuthController } from 'src/controllers/auth.controller';
import { UserEntity } from 'src/entities/user/user.entity';
import { AUTH_CONTROLLER_INBOUND_PORT } from 'src/inbound-ports/auth/auth-controller.inbound-port';
import { USER_REPOSITORY_OUTBOUND_PORT } from 'src/outbound-ports/user/user-repository.outbound-port';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    RedisModule,
    PassportModule,
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
    LocalStrategy,
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
