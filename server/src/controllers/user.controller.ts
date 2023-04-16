import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/guard/logged-in.guard';
import { Users } from 'src/decorators/user.decorator';
import { GetUserIdDto } from 'src/dtos/auth/get.user-id.dto';
import {
  UserControllerInboundPort,
  USER_CONTROLLER_INBOUND_PORT,
} from 'src/inbound-ports/user/user-controller.inbound-port';

@ApiTags('유저 API')
@Controller('api/users')
export class UserController {
  constructor(
    @Inject(USER_CONTROLLER_INBOUND_PORT)
    private readonly userControllerInboundPort: UserControllerInboundPort,
  ) {}

  @ApiOperation({
    summary: '자신의 댓글 목록 조회 api',
    description: '자신의 userId로 자신이 작성한 댓글 목록을 조회한다.',
  })
  @UseGuards(LoggedInGuard)
  @Get('info/comments')
  async getOwnComments(@Users() user: GetUserIdDto) {
    const comments = await this.userControllerInboundPort.readCommentsByUserId({
      userId: user.id,
    });
    return comments;
  }

  @ApiParam({
    name: 'userId',
    required: true,
    description: '유저 id',
  })
  @Get(':userId/comments')
  async readCommentsByUserId(@Param('userId') userId: string) {
    const comments = await this.userControllerInboundPort.readCommentsByUserId({
      userId: userId,
    });
    return comments;
  }
}
