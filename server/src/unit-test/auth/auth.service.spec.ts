import {
  getUserForLogInOutboundPortInputDto,
  getUserForLogInOutboundPortOutputDto,
  UserRepositoryOutboundPort,
} from 'src/outbound-ports/user/user-repository.outbound-port';
import { AuthService } from 'src/services/auth.service';
import { hash } from 'bcrypt';

class MockUserRepositoryOutboundPort implements UserRepositoryOutboundPort {
  private readonly result: getUserForLogInOutboundPortOutputDto;

  constructor(result: getUserForLogInOutboundPortOutputDto) {
    this.result = result;
  }

  async getUserForLogIn(
    params: getUserForLogInOutboundPortInputDto,
  ): Promise<getUserForLogInOutboundPortOutputDto> {
    return this.result;
  }
}

describe('AuthService Spec', () => {
  test('Validate User Test', async () => {
    const user: getUserForLogInOutboundPortOutputDto = {
      id: '1',
      createdAt: new Date('2023-01-01'),
      updatedAt: null,
      deletedAt: null,
      email: 'develop@google.com',
      password: await hash('1234', 10),
      googleId: null,
    };

    const authService = new AuthService(
      new MockUserRepositoryOutboundPort(user),
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
});
