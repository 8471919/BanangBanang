import {
  getUserForLogInOutboundPortInputDto,
  getUserForLogInOutboundPortOutputDto,
  UserRepositoryOutboundPort,
} from 'src/outbound-ports/user/user-repository.outbound-port';
import { AuthService } from 'src/services/auth.service';
import { hash } from 'bcrypt';
import {
  RedisDelOutboundInputDto,
  RedisDelOutboundOutputDto,
  RedisGetOutboundOutputDto,
  RedisGetOutbountInputDto,
  RedisRepositoryOutboundPort,
  RedisResetOutboundOutputDto,
  RedisSetOutboundInputDto,
  RedisSetOutboundOutputDto,
} from 'src/cache/redis/redis-repository.outbound-port';

class MockUserRepositoryOutboundPort implements UserRepositoryOutboundPort {
  private readonly result;

  constructor(result) {
    this.result = result;
  }

  async getUserForLogIn(
    params: getUserForLogInOutboundPortInputDto,
  ): Promise<getUserForLogInOutboundPortOutputDto> {
    return this.result;
  }
}

class MockRedisRepositoryOutboundPort implements RedisRepositoryOutboundPort {
  private readonly result;

  constructor(result) {
    this.result = result;
  }

  async get(params: RedisGetOutbountInputDto): RedisGetOutboundOutputDto {
    return this.result;
  }
  async set(params: RedisSetOutboundInputDto): RedisSetOutboundOutputDto {
    return this.result;
  }
  async del(params: RedisDelOutboundInputDto): RedisDelOutboundOutputDto {
    return this.result;
  }
  async reset(params: void): RedisResetOutboundOutputDto {
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
      new MockRedisRepositoryOutboundPort(1),
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

  test('Serialize and Deserialize User Test', async () => {
    const user = 'user1';
    const date = new Date().getTime();

    const authService = new AuthService(
      new MockUserRepositoryOutboundPort(1),
      new MockRedisRepositoryOutboundPort(date),
    );

    await authService.serializeUser({
      user: user,
      date: date,
    });

    const res = await authService.deserializeUser({
      user: user,
    });

    expect(res).toStrictEqual(date);
  });
});
