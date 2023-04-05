import {
  CommentRepositoryOutboundPort,
  SaveCommentOutboundPortInputDto,
  SaveCommentOutboundPortOutputDto,
} from 'src/outbound-ports/comment/comment-repository.outbound-port';
import { CommentService } from 'src/services/comment.service';

type MockCommentRepositoryOutboundPortParamType = {
  saveComment?: SaveCommentOutboundPortOutputDto;
};

class MockCommentRepositoryOutboundPort
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
});
