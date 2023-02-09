import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/auth.controller';
import { AUTH_CONTROLLER_INBOUND_PORT } from 'src/inbound-ports/auth/auth-controller.inbound-port';
import { USER_REPOSITORY_OUTBOUND_PORT } from 'src/outbound-ports/user/user-repository.outbound-port';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [],
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
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
