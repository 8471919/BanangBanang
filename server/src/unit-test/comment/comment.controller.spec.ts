import { CommentController } from 'src/controllers/comment.controller';
import {
  CommentControllerInboundPort,
  CreateCommentInboundPortInputDto,
  CreateCommentInboundPortOutputDto,
} from 'src/inbound-ports/comment/comment-controller.inbound-port';
import { SaveCommentOutboundPortInputDto } from 'src/outbound-ports/comment/comment-repository.outbound-port';

type MockCommentControllerInboundPortParamType = {
  createComment?: CreateCommentInboundPortOutputDto;
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
});
