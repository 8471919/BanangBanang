import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/common/error-message';
import { CommentEntity } from 'src/entities/comment/comment.entity';
import {
  CommentRepositoryOutboundPort,
  FindCommentsByUserIdOutboundPortInputDto,
  FindCommentsByUserIdOutboundPortOutputDto,
  SaveCommentOutboundPortInputDto,
  SaveCommentOutboundPortOutputDto,
  UpdateCommentOutboundPortInputDto,
  UpdateCommentOutboundPortOutputDto,
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

  async findCommentsByUserId(
    params: FindCommentsByUserIdOutboundPortInputDto,
  ): Promise<FindCommentsByUserIdOutboundPortOutputDto> {
    const comments = await this.commentRepository.findBy({
      userId: params.userId,
    });

    return comments;
  }

  async updateComment(
    params: UpdateCommentOutboundPortInputDto,
  ): Promise<UpdateCommentOutboundPortOutputDto> {
    const comment = await this.commentRepository.update(
      {
        id: params.commentId,
        userId: params.userId,
      },
      {
        content: params.content,
      },
    );

    console.log(comment);

    if (!comment.affected) {
      throw new BadRequestException(ERROR_MESSAGE.FAIL_TO_UPDATE_COMMENT);
    }

    return { affected: comment?.affected };
  }
}
