import { Inject, Injectable } from '@nestjs/common';
import {
  ReadCommentsByUserIdInboundPortInputDto,
  ReadCommentsByUserIdInboundPortOutputDto,
  UserControllerInboundPort,
} from 'src/inbound-ports/user/user-controller.inbound-port';
import {
  COMMENT_REPOSITORY_OUTBOUND_PORT,
  CommentRepositoryOutboundPort,
} from 'src/outbound-ports/comment/comment-repository.outbound-port';
import {
  UserRepositoryOutboundPort,
  USER_REPOSITORY_OUTBOUND_PORT,
} from 'src/outbound-ports/user/user-repository.outbound-port';

@Injectable()
export class UserService implements UserControllerInboundPort {
  constructor(
    @Inject(USER_REPOSITORY_OUTBOUND_PORT)
    private readonly userRepositoryOutboundPort: UserRepositoryOutboundPort,

    @Inject(COMMENT_REPOSITORY_OUTBOUND_PORT)
    private readonly commentRepositoryOutboundPort: CommentRepositoryOutboundPort,
  ) {}

  async readCommentsByUserId(
    params: ReadCommentsByUserIdInboundPortInputDto,
  ): Promise<ReadCommentsByUserIdInboundPortOutputDto> {
    const comments =
      await this.commentRepositoryOutboundPort.findCommentsByUserId({
        userId: params.userId,
      });

    return comments;
  }
}
