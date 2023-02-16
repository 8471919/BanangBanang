import { Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import {
  AuthControllerInboundPort,
  AUTH_CONTROLLER_INBOUND_PORT,
} from 'src/inbound-ports/auth/auth-controller.inbound-port';

@Controller('api/auths')
export class AuthController {
  constructor(
    @Inject(AUTH_CONTROLLER_INBOUND_PORT)
    private readonly authControllerInboundPort: AuthControllerInboundPort,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() req) {
    await this.authControllerInboundPort.serializeUser({
      user: req.user,
      date: new Date().getTime(),
      ttl: 3600,
    });
    return req.user;
  }
}
