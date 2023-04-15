import {
  CommentRepositoryOutboundPort,
  FindCommentsByUserIdOutboundPortInputDto,
  FindCommentsByUserIdOutboundPortOutputDto,
  SaveCommentOutboundPortInputDto,
  SaveCommentOutboundPortOutputDto,
  UpdateCommentOutboundPortInputDto,
  UpdateCommentOutboundPortOutputDto,
} from 'src/outbound-ports/comment/comment-repository.outbound-port';
import { CommentService } from 'src/services/comment.service';

export type MockCommentRepositoryOutboundPortParamType = {
  saveComment?: SaveCommentOutboundPortOutputDto;
  findCommentsByUserId?: FindCommentsByUserIdOutboundPortOutputDto;
  updateComment?: UpdateCommentOutboundPortOutputDto;
};

export class MockCommentRepositoryOutboundPort
  implements CommentRepositoryOutboundPort
{
  private readonly result: MockCommentRepositoryOutboundPortParamType;

  constructor(result: MockCommentRepositoryOutboundPortParamType) {
    this.result = result;
  }

  async saveComment(
    params: SaveCommentOutboundPortInputDto,
  ): Promise<SaveCommentOutboundPortOutputDto> {
    return this.result.saveComment;
  }

  async findCommentsByUserId(
    params: FindCommentsByUserIdOutboundPortInputDto,
  ): Promise<FindCommentsByUserIdOutboundPortOutputDto> {
    return this.result.findCommentsByUserId;
  }

  async updateComment(
    params: UpdateCommentOutboundPortInputDto,
  ): Promise<UpdateCommentOutboundPortOutputDto> {
    return this.result.updateComment;
  }
}

describe('CommentService Spec', () => {
  test('Create Comment', async () => {
    const comment: SaveCommentOutboundPortOutputDto = {
      articleId: '1',
      content: 'Test Comment',
      createdAt: new Date(),
      depth: 0,
      parentId: null,
      id: '1',
      updatedAt: new Date(),
      userId: '1',
    };

    const commentService = new CommentService(
      new MockCommentRepositoryOutboundPort({ saveComment: comment }),
    );

    const res = await commentService.createComment({
      articleId: '1',
      content: 'Test Comment',
      depth: 0,
      parentId: null,
      userId: '1',
    });

    expect(res).toStrictEqual(comment);
  });

  test('Update Comment', async () => {
    const affected = { affected: 1 };

    const commentService = new CommentService(
      new MockCommentRepositoryOutboundPort({ updateComment: affected }),
    );

    const res = await commentService.updateComment({
      commentId: '1',
      userId: '1',
      content: 'test comment',
    });

    expect(res).toStrictEqual({ affected: 1 });
  });
});
