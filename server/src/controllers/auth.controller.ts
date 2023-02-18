import { Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { Users } from 'src/decorators/user.decorator';
import { LogInUserDto } from 'src/dtos/auth/login.user.dto';
import {
  AuthControllerInboundPort,
  AUTH_CONTROLLER_INBOUND_PORT,
} from 'src/inbound-ports/auth/auth-controller.inbound-port';

@ApiTags('유저 인증 API')
@Controller('api/auths')
export class AuthController {
  constructor(
    @Inject(AUTH_CONTROLLER_INBOUND_PORT)
    private readonly authControllerInboundPort: AuthControllerInboundPort,
  ) {}

  @ApiOperation({
    summary: 'Local 로그인 인증 api',
    description:
      '유저의 이메일과 비밀번호가 데이터베이스와 동일하면 인증에 성공하며, 세션에 user${id}: current_time 형태로 등록한다.',
  })
  @ApiBody({
    type: LogInUserDto,
  })
  @ApiOkResponse({
    description: '성공 : userId를 제공한다.',
    type: Number,
  })
  @ApiUnauthorizedResponse({
    description:
      '인증 실패 : 에러 발생 일시, 에러 메시지, 에러가 발생된 Path, status code를 반환한다.',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Users() user) {
    return user;
  }
}
