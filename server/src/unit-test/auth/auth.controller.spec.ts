import { AuthController } from 'src/controllers/auth.controller';
import { RegisterUserDto } from 'src/dtos/register.user.dto';
import {
  AuthControllerInboundPort,
  RegisterInboundInputDto,
  RegisterInboundOutputDto,
  ValidateUserInboundInputDto,
  ValidateUserInboundOutputDto,
} from 'src/inbound-ports/auth/auth-controller.inbound-port';

type MockAuthControllerInboundPortParamType = {
  validateUser?: ValidateUserInboundOutputDto;
  register?: RegisterInboundOutputDto;
};
class MockAuthControllerInboundPort implements AuthControllerInboundPort {
  private readonly result: MockAuthControllerInboundPortParamType;

  constructor(result: MockAuthControllerInboundPortParamType) {
    this.result = result;
  }
  async validateUser(
    params: ValidateUserInboundInputDto,
  ): Promise<ValidateUserInboundOutputDto> {
    return this.result.validateUser;
  }
  async register(params: RegisterInboundInputDto): Promise<void> {
    return this.result.register;
  }
}

describe('AuthController Spec', () => {
  test('Local logIn', async () => {
    const user = {
      id: 1,
      email: 'develop@google.com',
    };

    const session = {
      id: 10,
    };

    const authController = new AuthController(
      new MockAuthControllerInboundPort(null),
    );
    const res = await authController.logIn(user, session);

    expect(res).toStrictEqual({ user, sessionId: session.id });
  });

  test('Register User', async () => {
    try {
      const user: RegisterUserDto = {
        email: 'develop@google.com',
        password: '1234',
      };

      const authController = new AuthController(
        new MockAuthControllerInboundPort({ register: undefined }),
      );
      await authController.register(user);
    } catch (err) {
      expect(2).toBe(1);
    }
  });
});
