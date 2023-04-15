import { Inject, Injectable } from '@nestjs/common';
import {
  CommentControllerInboundPort,
  CreateCommentInboundPortInputDto,
  CreateCommentInboundPortOutputDto,
  DeleteCommentInboundPortInputDto,
  DeleteCommentInboundPortOutputDto,
  UpdateCommentInboundPortInputDto,
  UpdateCommentInboundPortOutputDto,
} from 'src/inbound-ports/comment/comment-controller.inbound-port';
import {
  COMMENT_REPOSITORY_OUTBOUND_PORT,
  CommentRepositoryOutboundPort,
} from 'src/outbound-ports/comment/comment-repository.outbound-port';

@Injectable()
export class CommentService implements CommentControllerInboundPort {
  constructor(
    @Inject(COMMENT_REPOSITORY_OUTBOUND_PORT)
    private readonly commentRepositoryOutboundPort: CommentRepositoryOutboundPort,
  ) {}

  async createComment(
    params: CreateCommentInboundPortInputDto,
  ): Promise<CreateCommentInboundPortOutputDto> {
    const comment = await this.commentRepositoryOutboundPort.saveComment(
      params,
    );

    console.log('Here is Comment Service');

    console.log(comment);

    return comment;
  }

  async updateComment(
    params: UpdateCommentInboundPortInputDto,
  ): Promise<UpdateCommentInboundPortOutputDto> {
    return this.commentRepositoryOutboundPort.updateComment(params);
  }

  async deleteComment(
    params: DeleteCommentInboundPortInputDto,
  ): Promise<DeleteCommentInboundPortOutputDto> {
    return this.commentRepositoryOutboundPort.deleteComment(params);
  }
}
