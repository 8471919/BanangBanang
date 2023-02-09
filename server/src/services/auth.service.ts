import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/common/error-message';
import {
  AuthControllerInboundPort,
  ValidateUserInboundInputDto,
  ValidateUserInboundOutputDto,
} from 'src/inbound-ports/auth/auth-controller.inbound-port';
import {
  UserRepositoryOutboundPort,
  USER_REPOSITORY_OUTBOUND_PORT,
} from 'src/outbound-ports/user/user-repository.outbound-port';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService implements AuthControllerInboundPort {
  constructor(
    @Inject(USER_REPOSITORY_OUTBOUND_PORT)
    private readonly userRepositoryOutboundPort: UserRepositoryOutboundPort,
  ) {}

  async validateUser(
    params: ValidateUserInboundInputDto,
  ): Promise<ValidateUserInboundOutputDto> {
    const user = await this.userRepositoryOutboundPort.getUserForLogIn({
      email: params.email,
    });

    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.FAIL_TO_CREATE_USER);
    }

    // verify password
    const isPasswordMatch = await compare(params.password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException(ERROR_MESSAGE.FAIL_TO_LOGIN);
    }

    return {
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      email: user.email,
      googleId: user.googleId,
    };
  }
}
