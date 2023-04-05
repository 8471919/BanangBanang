import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entities/comment/comment.entity';
import {
  CommentRepositoryOutboundPort,
  SaveCommentOutboundPortInputDto,
  SaveCommentOutboundPortOutputDto,
} from 'src/outbound-ports/comment/comment-repository.outbound-port';
import { Repository } from 'typeorm';

@Injectable()
export class CommentRepository implements CommentRepositoryOutboundPort {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async saveComment(
    params: SaveCommentOutboundPortInputDto,
  ): Promise<SaveCommentOutboundPortOutputDto> {
    const comment = await this.commentRepository.save(params);

    return comment;
  }
}
