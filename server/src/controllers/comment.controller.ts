import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/guard/logged-in.guard';
import {
  COMMENT_CONTROLLER_INBOUND_PORT,
  CommentControllerInboundPort,
  CreateCommentInboundPortInputDto,
} from 'src/inbound-ports/comment/comment-controller.inbound-port';

@ApiTags('댓글 API')
@Controller('api/comments')
export class CommentController {
  constructor(
    @Inject(COMMENT_CONTROLLER_INBOUND_PORT)
    private readonly commentControllerInboundPort: CommentControllerInboundPort,
  ) {}

  @ApiOperation({
    summary: '댓글 작성 api',
    description: '게시글에 대한 댓글을 생성',
  })
  @ApiBody({
    schema: {
      properties: {
        parentId: { default: null },
        articleId: { default: 2 },
        content: { default: 'test comment' },
        depth: { default: 0 },
        userId: { default: 1 },
      },
    },
  })
  @UseGuards(LoggedInGuard)
  @Post()
  async createComment(@Body() body: CreateCommentInboundPortInputDto) {
    const comment = await this.commentControllerInboundPort.createComment(body);

    return comment;
  }
}
