import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from 'src/controllers/comment.controller';
import { CommentEntity } from 'src/entities/comment/comment.entity';
import { COMMENT_CONTROLLER_INBOUND_PORT } from 'src/inbound-ports/comment/comment-controller.inbound-port';
import { COMMENT_REPOSITORY_OUTBOUND_PORT } from 'src/outbound-ports/comment/comment-repository.outbound-port';
import { CommentRepository } from 'src/repositories/comment.repository';
import { CommentService } from 'src/services/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  controllers: [CommentController],
  providers: [
    {
      provide: COMMENT_CONTROLLER_INBOUND_PORT,
      useClass: CommentService,
    },
    {
      provide: COMMENT_REPOSITORY_OUTBOUND_PORT,
      useClass: CommentRepository,
    },
    CommentService,
  ],
})
export class CommentModule {}
