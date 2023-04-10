import {
  FindUserByEmailOutboundPortInputDto,
  FindUserByEmailOutboundPortOutputDto,
  FindUserByGoogleIdOutboundPortInputDto,
  FindUserByGoogleIdOutboundPortOutputDto,
  FindUserForDeserializeOutboundPortInputDto,
  FindUserForDeserializeOutboundPortOPutputDto,
  FindUserForLogInOutboundPortInputDto,
  FindUserForLogInOutboundPortOutputDto,
  SaveGoogleUserOutboundPortInputDto,
  SaveGoogleUserOutboundPortOutputDto,
  SaveUserOutboundPortInputDto,
  UserRepositoryOutboundPort,
} from 'src/outbound-ports/user/user-repository.outbound-port';
import { AuthService } from 'src/services/auth.service';
import { hash } from 'bcrypt';
import { ConfigServiceOutboundPort } from 'src/config/config-service.outbound-port';
import { ConfigService } from '@nestjs/config';

export type MockUserRepositoryOutboundPortParamType = {
  findUserForLogIn?: FindUserForLogInOutboundPortOutputDto;
  findUserForDeserialize?: FindUserForDeserializeOutboundPortOPutputDto;
  findUserByEmail?: FindUserByEmailOutboundPortOutputDto;
  findUserByGoogleId?: FindUserByGoogleIdOutboundPortOutputDto;
  saveUser?: unknown;
  saveGoogleUser?: SaveGoogleUserOutboundPortOutputDto;
};
export class MockUserRepositoryOutboundPort
  implements UserRepositoryOutboundPort
{
  private readonly result: MockUserRepositoryOutboundPortParamType;

  constructor(result: MockUserRepositoryOutboundPortParamType) {
    this.result = result;
  }

  async findUserForLogIn(
    params: FindUserForLogInOutboundPortInputDto,
  ): Promise<FindUserForLogInOutboundPortOutputDto> {
    return this.result.findUserForLogIn;
  }
  async findUserForDeserialize(
    params: FindUserForDeserializeOutboundPortInputDto,
  ): Promise<FindUserForDeserializeOutboundPortOPutputDto> {
    return this.result.findUserForDeserialize;
  }
  async findUserByEmail(
    params: FindUserByEmailOutboundPortInputDto,
  ): Promise<FindUserByEmailOutboundPortOutputDto> {
    return this.result.findUserByEmail;
  }
  async findUserByGoogleId(
    params: FindUserByGoogleIdOutboundPortInputDto,
  ): Promise<FindUserByGoogleIdOutboundPortOutputDto> {
    return this.result.findUserByGoogleId;
  }
  async saveUser(params: SaveUserOutboundPortInputDto): Promise<unknown> {
    return this.result.saveUser;
  }
  async saveGoogleUser(
    params: SaveGoogleUserOutboundPortInputDto,
  ): Promise<SaveGoogleUserOutboundPortOutputDto> {
    return this.result.saveGoogleUser;
  }
}

const configService = new ConfigService();

describe('AuthService Spec', () => {
  test('ValidateUser Test', async () => {
    const user: FindUserForLogInOutboundPortOutputDto = {
      id: '1',
      createdAt: new Date('2023-01-01'),
      updatedAt: null,
      deletedAt: null,
      email: 'develop@google.com',
      password: await hash('1234', 10),
      googleId: null,
    };

    const authService = new AuthService(
      new MockUserRepositoryOutboundPort({ findUserForLogIn: user }),
      configService,
    );
    const res = await authService.validateUser({
      email: 'develop@google.com',
      password: '1234',
    });

    expect(res).toStrictEqual({
      id: '1',
      createdAt: new Date('2023-01-01'),
      updatedAt: null,
      deletedAt: null,
      email: 'develop@google.com',
      googleId: null,
    });
  });

  test('Register User Test', async () => {
    try {
      const existedUser = undefined;
      const user = {
        email: 'develop@google.com',
      };

      const authService = new AuthService(
        new MockUserRepositoryOutboundPort({
          findUserByEmail: existedUser,
          saveUser: 1,
        }),
        configService,
      );

      await authService.register({
        email: user.email,
        password: '1234',
      });
    } catch (err) {
      expect(1).toBe(2);
    }
  });

  test('ValidateUserForGoogle Test When User is already existed', async () => {
    const user = {
      providerId: '1',
    };

    const authService = new AuthService(
      new MockUserRepositoryOutboundPort({
        findUserByGoogleId: { googleId: '1' },
        saveGoogleUser: null,
      }),
      configService,
    );

    const res = await authService.validateUserForGoogle(user);

    expect(res).toStrictEqual({ googleId: '1' });
  });

  test('ValidateUserForGoogle Test When User is not existed', async () => {
    const user = {
      providerId: '2',
    };

    const authService = new AuthService(
      new MockUserRepositoryOutboundPort({
        findUserByGoogleId: null,
        saveGoogleUser: { googleId: '2' },
      }),
      configService,
    );

    const res = await authService.validateUserForGoogle(user);

    expect(res).toStrictEqual({ googleId: '2' });
  });
});
