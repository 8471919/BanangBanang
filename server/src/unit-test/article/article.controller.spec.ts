import { ArticleController } from 'src/controllers/article.controller';
import {
  ArticleControllerInboundPort,
  CreateArticleInboundPortInputDto,
  CreateArticleInboundPortOutputDto,
} from 'src/inbound-ports/article/article-controller.inbound-port';

type MockArticleControllerInboundPortParamType = {
  createArticle?: CreateArticleInboundPortOutputDto;
};

class MockArticleControllerInboundPort implements ArticleControllerInboundPort {
  private readonly result: MockArticleControllerInboundPortParamType;

  constructor(result: MockArticleControllerInboundPortParamType) {
    this.result = result;
  }
  async createArticle(
    params: CreateArticleInboundPortInputDto,
  ): Promise<CreateArticleInboundPortOutputDto> {
    return this.result.createArticle;
  }
}

describe('ArticleController Spec', () => {
  test('Create Article', async () => {
    const body: CreateArticleInboundPortInputDto = {
      title: 'Test Article',
      content: 'Hello, World!',
      userId: '1',
      articleAreaId: 1,
      articleTypeId: 1,
    };

    const articleController = new ArticleController(
      new MockArticleControllerInboundPort({
        createArticle: { articleId: '1' },
      }),
    );

    const res = await articleController.createArticle(body);

    expect(res).toStrictEqual({ articleId: '1' });
  });
});
