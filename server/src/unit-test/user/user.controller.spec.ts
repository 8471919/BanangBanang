import { UserController } from 'src/controllers/user.controller';
import {
  ReadCommentsByUserIdInboundPortInputDto,
  ReadCommentsByUserIdInboundPortOutputDto,
  UserControllerInboundPort,
} from 'src/inbound-ports/user/user-controller.inbound-port';

type MockUserControllerInboundPortParamType = {
  readCommentsByUserId?: ReadCommentsByUserIdInboundPortOutputDto;
};

class MockUserControllerInboundPort implements UserControllerInboundPort {
  private readonly result: MockUserControllerInboundPortParamType;

  constructor(result: MockUserControllerInboundPortParamType) {
    this.result = result;
  }

  async readCommentsByUserId(
    params: ReadCommentsByUserIdInboundPortInputDto,
  ): Promise<ReadCommentsByUserIdInboundPortOutputDto> {
    return this.result.readCommentsByUserId;
  }
}

describe('UserController Spec', () => {
  test('Read Own Comments', async () => {
    const comments: ReadCommentsByUserIdInboundPortOutputDto = [
      {
        articleId: '1',
        content: '1 test comment',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
        id: '1',
        userId: '1',
      },
      {
        articleId: '2',
        content: '2 test comment',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
        id: '2',
        userId: '1',
      },
    ];

    const userController = new UserController(
      new MockUserControllerInboundPort({ readCommentsByUserId: comments }),
    );

    const res = await userController.getOwnComments({
      id: '1',
    });

    expect(res).toStrictEqual([
      {
        articleId: '1',
        content: '1 test comment',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
        id: '1',
        userId: '1',
      },
      {
        articleId: '2',
        content: '2 test comment',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
        id: '2',
        userId: '1',
      },
    ]);
  });

  test('Read Comments By User Id', async () => {
    const comments: ReadCommentsByUserIdInboundPortOutputDto = [
      {
        articleId: '1',
        content: '1 test comment',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
        id: '1',
        userId: '1',
      },
      {
        articleId: '2',
        content: '2 test comment',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
        id: '2',
        userId: '1',
      },
    ];

    const userController = new UserController(
      new MockUserControllerInboundPort({ readCommentsByUserId: comments }),
    );

    const res = await userController.readCommentsByUserId('1');

    expect(res).toStrictEqual([
      {
        articleId: '1',
        content: '1 test comment',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
        id: '1',
        userId: '1',
      },
      {
        articleId: '2',
        content: '2 test comment',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
        id: '2',
        userId: '1',
      },
    ]);
  });
});
