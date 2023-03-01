import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import {
  UserRepositoryOutboundPort,
  USER_REPOSITORY_OUTBOUND_PORT,
} from 'src/outbound-ports/user/user-repository.outbound-port';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    @Inject(USER_REPOSITORY_OUTBOUND_PORT)
    private readonly userRepositoryOutboundPort: UserRepositoryOutboundPort,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: any, done: Function) {
    console.log("here is LocalSerializer's serializeUser");
    console.log(user);
    done(null, user.id ?? { id: user.providerId, provider: 'google' });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async deserializeUser(payload: any, done: Function) {
    console.log('Deserialization');
    console.log(payload);

    if (payload.provider === 'google') {
      return await this.userRepositoryOutboundPort.findUserByGoogleId({
        googleId: payload.id,
      });
    }
    return await this.userRepositoryOutboundPort.findUserForDeserialize({
      userId: payload,
      done,
    });
  }
}
