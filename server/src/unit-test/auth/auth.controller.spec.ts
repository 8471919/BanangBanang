import { AuthController } from 'src/controllers/auth.controller';
import { RegisterUserDto } from 'src/dtos/register.user.dto';
import {
  AuthControllerInboundPort,
  RegisterInboundInputDto,
  RegisterInboundOutputDto,
  ValidateUserForGoogleInboundInputDto,
  ValidateUserForGoogleInboundOutputDto,
  ValidateUserInboundInputDto,
  ValidateUserInboundOutputDto,
} from 'src/inbound-ports/auth/auth-controller.inbound-port';

type MockAuthControllerInboundPortParamType = {
  validateUser?: ValidateUserInboundOutputDto;
  register?: RegisterInboundOutputDto;
  validateUserForGoogle?: ValidateUserForGoogleInboundOutputDto;
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
  async validateUserForGoogle(
    params: ValidateUserForGoogleInboundInputDto,
  ): Promise<ValidateUserForGoogleInboundOutputDto> {
    return this.result.validateUserForGoogle;
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

  test('Google LogIn', async () => {
    const user: ValidateUserForGoogleInboundInputDto = {
      accessToken: '123',
    };
    const authController = new AuthController(
      new MockAuthControllerInboundPort({
        validateUserForGoogle: { googleId: '1' },
      }),
    );

    await authController.googleAuth();
    const res = await authController.googleAuthCallback(user, { id: 1 });

    expect(res).toStrictEqual({ user: { accessToken: '123' }, sessionId: 1 });
  });

  test('LogOut', async () => {
    const request = {};

    const response = {
      clearCookie: (sid: string, options: object) => true,
      send: (message: string) => message,
    };

    const session = {
      destroy: () => true,
    };

    const authController = new AuthController(
      new MockAuthControllerInboundPort(null),
    );
    try {
      await authController.logOut(request, response, session);
    } catch (err) {
      expect(1).toBe(2);
    }
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
