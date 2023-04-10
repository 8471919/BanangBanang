import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/guard/logged-in.guard';
import { Users } from 'src/decorators/user.decorator';
import { GetUserIdDto } from 'src/dtos/auth/get.user-id.dto';
import {
  UserControllerInboundPort,
  USER_CONTROLLER_INBOUND_PORT,
} from 'src/inbound-ports/user/user-controller.inbound-port';

@Controller('api/users')
export class UserController {
  constructor(
    @Inject(USER_CONTROLLER_INBOUND_PORT)
    private readonly userControllerInboundPort: UserControllerInboundPort,
  ) {}

  @UseGuards(LoggedInGuard)
  @Get('info/comments')
  async readCommentsByUserId(@Users() user: GetUserIdDto) {
    const comments = await this.userControllerInboundPort.readCommentsByUserId({
      userId: user.id,
    });
    return comments;
  }
}
