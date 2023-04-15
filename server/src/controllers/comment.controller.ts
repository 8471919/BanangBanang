import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/guard/logged-in.guard';
import { Users } from 'src/decorators/user.decorator';
import { GetUserIdDto } from 'src/dtos/auth/get.user-id.dto';
import { UpdateCommentDto } from 'src/dtos/comment/update.comment.dto';
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

  // NOTE: Update
  @ApiOperation({
    summary: '댓글 수정 api',
    description: '댓글의 id로 해당 댓글의 내용을 수정',
  })
  @ApiBody({
    schema: {
      properties: {
        content: { default: 'modified content' },
      },
    },
  })
  @UseGuards(LoggedInGuard)
  @Put(':id')
  async updateComment(
    @Users() user: GetUserIdDto,
    @Param('id') id: string,
    @Body() body: UpdateCommentDto,
  ) {
    return await this.commentControllerInboundPort.updateComment({
      userId: user.id,
      commentId: id,
      content: body.content,
    });
  }
}
