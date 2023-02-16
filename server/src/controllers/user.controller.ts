import { Controller, Inject } from '@nestjs/common';
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
}
