import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from 'src/controllers/comment.controller';
import { CommentRepository } from 'src/repositories/comment.repository';
import { CommentService } from 'src/services/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
