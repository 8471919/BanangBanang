import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/common/error-message';
import {
  AuthControllerInboundPort,
  DeserializeUserInboundInputDto,
  DeserializeUserInboundOutputDto,
  SerializeUserInboundInputDto,
  SerializeUserInboundOutputDto,
  ValidateUserInboundInputDto,
  ValidateUserInboundOutputDto,
} from 'src/inbound-ports/auth/auth-controller.inbound-port';
import {
  UserRepositoryOutboundPort,
  USER_REPOSITORY_OUTBOUND_PORT,
} from 'src/outbound-ports/user/user-repository.outbound-port';
import { compare } from 'bcrypt';
import {
  RedisRepositoryOutboundPort,
  REDIS_REPOSITORY_OUTBOUND_PORT,
} from 'src/cache/redis/redis-repository.outbound-port';

@Injectable()
export class AuthService implements AuthControllerInboundPort {
  constructor(
    @Inject(USER_REPOSITORY_OUTBOUND_PORT)
    private readonly userRepositoryOutboundPort: UserRepositoryOutboundPort,

    @Inject(REDIS_REPOSITORY_OUTBOUND_PORT)
    private readonly redisRepositoryOutboundPort: RedisRepositoryOutboundPort,
  ) {}

  async validateUser(
    params: ValidateUserInboundInputDto,
  ): Promise<ValidateUserInboundOutputDto> {
    const user = await this.userRepositoryOutboundPort.getUserForLogIn({
      email: params.email,
    });

    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.FAIL_TO_FIND_EMAIL);
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

  async serializeUser(
    params: SerializeUserInboundInputDto,
  ): Promise<SerializeUserInboundOutputDto> {
    await this.redisRepositoryOutboundPort.set({
      key: params.user,
      value: params.date,
      ttl: params.ttl,
    });
  }

  async deserializeUser(
    params: DeserializeUserInboundInputDto,
  ): Promise<DeserializeUserInboundOutputDto> {
    return await this.redisRepositoryOutboundPort.get({
      key: params.user,
    });
  }
}
