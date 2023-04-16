import { UserService } from 'src/services/user.service';
import { MockUserRepositoryOutboundPort } from '../auth/auth.service.spec';
import { MockCommentRepositoryOutboundPort } from '../comment/comment.service.spec';
import { FindCommentsByUserIdOutboundPortOutputDto } from 'src/outbound-ports/comment/comment-repository.outbound-port';

describe('UserService Spec', () => {
  test('Read Own Comments', async () => {
    const comments: FindCommentsByUserIdOutboundPortOutputDto = [
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
    const userService = new UserService(
      new MockUserRepositoryOutboundPort(null),
      new MockCommentRepositoryOutboundPort({ findCommentsByUserId: comments }),
    );

    const res = await userService.readCommentsByUserId({
      userId: '1',
    });

    expect(res).toStrictEqual(comments);
  });

  test('Read Comments By User Id', async () => {
    const comments: FindCommentsByUserIdOutboundPortOutputDto = [
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

    const userService = new UserService(
      new MockUserRepositoryOutboundPort(null),
      new MockCommentRepositoryOutboundPort({ findCommentsByUserId: comments }),
    );

    const res = await userService.readCommentsByUserId({ userId: '1' });

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
