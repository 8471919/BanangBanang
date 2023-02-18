import { Inject, Injectable } from '@nestjs/common';
import { UserControllerInboundPort } from 'src/inbound-ports/user/user-controller.inbound-port';
import {
  UserRepositoryOutboundPort,
  USER_REPOSITORY_OUTBOUND_PORT,
} from 'src/outbound-ports/user/user-repository.outbound-port';

@Injectable()
export class UserService implements UserControllerInboundPort {
  constructor(
    @Inject(USER_REPOSITORY_OUTBOUND_PORT)
    private readonly userRepositoryOutboundPort: UserRepositoryOutboundPort,
  ) {}
  login(params: void): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
