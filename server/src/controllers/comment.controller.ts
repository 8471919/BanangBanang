import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/guard/logged-in.guard';
import {
  COMMENT_CONTROLLER_INBOUND_PORT,
  CommentControllerInboundPort,
  CreateCommentInboundPortInputDto,
} from 'src/inbound-ports/comment/comment-controller.inbound-port';

@Controller('api/comments')
export class CommentController {
  constructor(
    @Inject(COMMENT_CONTROLLER_INBOUND_PORT)
    private readonly commentControllerInboundPort: CommentControllerInboundPort,
  ) {}

  @UseGuards(LoggedInGuard)
  @Post()
  async createComment(@Body() body: CreateCommentInboundPortInputDto) {
    const comment = await this.commentControllerInboundPort.createComment(body);

    return comment;
  }
}
