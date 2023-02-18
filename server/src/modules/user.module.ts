import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user.controller';
import { UserEntity } from 'src/entities/user/user.entity';
import { USER_CONTROLLER_INBOUND_PORT } from 'src/inbound-ports/user/user-controller.inbound-port';
import { USER_REPOSITORY_OUTBOUND_PORT } from 'src/outbound-ports/user/user-repository.outbound-port';
import { UserRepository } from 'src/repositories/user.repository';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: USER_CONTROLLER_INBOUND_PORT,
      useClass: UserService,
    },
    {
      provide: USER_REPOSITORY_OUTBOUND_PORT,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
