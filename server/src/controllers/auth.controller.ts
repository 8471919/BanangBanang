import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/guard/logged-in.guard';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { Users } from 'src/decorators/user.decorator';
import { LogInUserDto } from 'src/dtos/auth/login.user.dto';
import { RegisterUserDto } from 'src/dtos/register.user.dto';
import {
  AuthControllerInboundPort,
  AUTH_CONTROLLER_INBOUND_PORT,
  ValidateUserForGoogleInboundInputDto,
} from 'src/inbound-ports/auth/auth-controller.inbound-port';
import { GoogleAuthGuard } from 'src/auth/guard/google-auth.guard';

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
  async logIn(@Users() user, @Session() session) {
    console.log(session.id);
    return { user, sessionId: session.id };
  }

  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Local 회원가입 api',
    description: '유저의 이메일과 일치하는 메일이 없으면 회원가입에 성공한다.',
  })
  @ApiBody({
    type: RegisterUserDto,
  })
  @ApiCreatedResponse({
    description: '성공 : DB에 유저를 등록한다.',
  })
  @Post('register')
  async register(@Body() user: RegisterUserDto) {
    await this.authControllerInboundPort.register({
      email: user.email,
      password: user.password,
    });
  }

  // TODO: Swagger에서 세션 로그인이 잘 작동하는지 확인하기 위한 용도이므로, 나중에 삭제해야한다.
  @ApiCookieAuth()
  @UseGuards(LoggedInGuard)
  @Get('hi')
  async hi() {
    return 'hi';
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth() {
    // redirect google login page
  }

  // 구글 로그인 후 callbackURL로 오는 요청을 처리할 API
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAuthCallback(
    @Users() user: ValidateUserForGoogleInboundInputDto,
    @Session() session,
  ) {
    const googleId = await this.authControllerInboundPort.validateUserForGoogle(
      user,
    );

    return { user, sessionId: session.id };
  }

  @Post('logout')
  async logOut(@Req() req, @Res() res, @Session() session) {
    session.destroy();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('OK');
  }
}
