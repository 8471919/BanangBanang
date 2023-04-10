import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user.controller';
import { CommentEntity } from 'src/entities/comment/comment.entity';
import { UserEntity } from 'src/entities/user/user.entity';
import { USER_CONTROLLER_INBOUND_PORT } from 'src/inbound-ports/user/user-controller.inbound-port';
import { COMMENT_REPOSITORY_OUTBOUND_PORT } from 'src/outbound-ports/comment/comment-repository.outbound-port';
import { USER_REPOSITORY_OUTBOUND_PORT } from 'src/outbound-ports/user/user-repository.outbound-port';
import { CommentRepository } from 'src/repositories/comment.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CommentEntity])],
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
    {
      provide: COMMENT_REPOSITORY_OUTBOUND_PORT,
      useClass: CommentRepository,
    },
  ],
})
export class UserModule {}
