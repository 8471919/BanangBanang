import { Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
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
    return req.user;
  }
}
