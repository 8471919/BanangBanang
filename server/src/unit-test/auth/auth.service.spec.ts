import {
  FindUserByEmailOutboundPortInputDto,
  FindUserByEmailOutboundPortOutputDto,
  FindUserForLogInOutboundPortInputDto,
  FindUserForLogInOutboundPortOutputDto,
  SaveUserOutboundPortInputDto,
  UserRepositoryOutboundPort,
} from 'src/outbound-ports/user/user-repository.outbound-port';
import { AuthService } from 'src/services/auth.service';
import { hash } from 'bcrypt';
import { ConfigServiceOutboundPort } from 'src/config/config-service.outbound-port';

type MockUserRepositoryOutboundPortParamType = {
  findUserForLogIn?: FindUserForLogInOutboundPortOutputDto;
  findUserByEmail?: FindUserByEmailOutboundPortOutputDto;
  saveUser?: unknown;
};
class MockUserRepositoryOutboundPort implements UserRepositoryOutboundPort {
  private readonly result: MockUserRepositoryOutboundPortParamType;

  constructor(result: MockUserRepositoryOutboundPortParamType) {
    this.result = result;
  }

  async findUserForLogIn(
    params: FindUserForLogInOutboundPortInputDto,
  ): Promise<FindUserForLogInOutboundPortOutputDto> {
    return this.result.findUserForLogIn;
  }
  async findUserByEmail(
    params: FindUserByEmailOutboundPortInputDto,
  ): Promise<FindUserByEmailOutboundPortOutputDto> {
    return this.result.findUserByEmail;
  }
  async saveUser(params: SaveUserOutboundPortInputDto): Promise<unknown> {
    return this.result.saveUser;
  }
}

type MockConfigServiceOutboundPortParamType = {
  getSaltForHash?: number;
};
class MockConfigServiceOutboundPort implements ConfigServiceOutboundPort {
  private readonly result: MockConfigServiceOutboundPortParamType;
  constructor(result: MockConfigServiceOutboundPortParamType) {
    this.result = result;
  }
  async getSaltForHash(params: void): Promise<number> {
    return this.result.getSaltForHash;
  }
}

describe('AuthService Spec', () => {
  test('Validate User Test', async () => {
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
      new MockConfigServiceOutboundPort(null),
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
        new MockConfigServiceOutboundPort({ getSaltForHash: 1 }),
      );

      await authService.register({
        email: user.email,
        password: '1234',
      });
    } catch (err) {
      expect(1).toBe(2);
    }
  });
});
