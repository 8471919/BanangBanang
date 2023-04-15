import { CommentController } from 'src/controllers/comment.controller';
import {
  CommentControllerInboundPort,
  CreateCommentInboundPortInputDto,
  CreateCommentInboundPortOutputDto,
  UpdateCommentInboundPortInputDto,
  UpdateCommentInboundPortOutputDto,
} from 'src/inbound-ports/comment/comment-controller.inbound-port';
import { SaveCommentOutboundPortInputDto } from 'src/outbound-ports/comment/comment-repository.outbound-port';

type MockCommentControllerInboundPortParamType = {
  createComment?: CreateCommentInboundPortOutputDto;
  updateComment?: UpdateCommentInboundPortOutputDto;
};

class MockCommentControllerInboundPort implements CommentControllerInboundPort {
  private readonly result: MockCommentControllerInboundPortParamType;

  constructor(result: MockCommentControllerInboundPortParamType) {
    this.result = result;
  }

  async createComment(
    params: CreateCommentInboundPortInputDto,
  ): Promise<CreateCommentInboundPortOutputDto> {
    return this.result.createComment;
  }

  async updateComment(
    params: UpdateCommentInboundPortInputDto,
  ): Promise<UpdateCommentInboundPortOutputDto> {
    return this.result.updateComment;
  }
}

describe('CommentController Spec', () => {
  test('Create Comment', async () => {
    const body: SaveCommentOutboundPortInputDto = {
      articleId: '1',
      content: 'Test Comment',
      depth: 0,
      parentId: null,
      userId: '1',
    };

    const comment: CreateCommentInboundPortOutputDto = {
      articleId: '1',
      content: 'Test Comment',
      createdAt: new Date(),
      depth: 0,
      parentId: null,
      id: '1',
      updatedAt: new Date(),
      userId: '1',
    };

    const commentController = new CommentController(
      new MockCommentControllerInboundPort({ createComment: comment }),
    );

    const res = await commentController.createComment(body);

    expect(res).toStrictEqual(comment);
  });

  test('Update Comment', async () => {
    const affected = { affected: 1 };

    const commentController = new CommentController(
      new MockCommentControllerInboundPort({ updateComment: affected }),
    );

    const res = await commentController.updateComment({ id: '1' }, '1', {
      content: 'test content',
    });

    expect(res).toStrictEqual({ affected: 1 });
  });
});
