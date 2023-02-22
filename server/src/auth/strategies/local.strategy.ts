import { Strategy } from 'passport-local';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  AuthControllerInboundPort,
  AUTH_CONTROLLER_INBOUND_PORT,
} from 'src/inbound-ports/auth/auth-controller.inbound-port';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @Inject(AUTH_CONTROLLER_INBOUND_PORT)
    private readonly authControllerInboundPort: AuthControllerInboundPort,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(
    email: string,
    password: string,
    done: CallableFunction,
  ): Promise<any> {
    console.log('here is LocalStrategy1');
    const user = await this.authControllerInboundPort.validateUser({
      email: email,
      password: password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    console.log('here is LocalStrategy2');

    return done(null, user);
  }
}
