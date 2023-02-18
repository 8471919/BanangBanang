import { AuthController } from 'src/controllers/auth.controller';
import {
  AuthControllerInboundPort,
  ValidateUserInboundInputDto,
  ValidateUserInboundOutputDto,
} from 'src/inbound-ports/auth/auth-controller.inbound-port';

class MockAuthControllerInboundPort implements AuthControllerInboundPort {
  async validateUser(
    params: ValidateUserInboundInputDto,
  ): Promise<ValidateUserInboundOutputDto> {
    throw new Error('Method not implemented.');
  }
}

describe('AuthController Spec', () => {
  test('Local logIn', async () => {
    const authController = new AuthController(
      new MockAuthControllerInboundPort(),
    );
    const user = await authController.logIn({ user: 1 });

    expect(user).toStrictEqual('1');
  });
});
