import { ArticleController } from 'src/controllers/article.controller';
import {
  ArticleControllerInboundPort,
  CreateArticleInboundPortInputDto,
  CreateArticleInboundPortOutputDto,
  ReadAnArticleInboundPortInputDto,
  ReadAnArticleInboundPortOutputDto,
  ReadArticlesInboundPortInputDto,
  ReadArticlesInboundPortOutputDto,
  RemoveArticleInboundPortInputDto,
  RemoveArticleInboundPortOutputDto,
  UpdateArticleInboundPortInputDto,
  UpdateArticleInboundPortOutputDto,
} from 'src/inbound-ports/article/article-controller.inbound-port';

type MockArticleControllerInboundPortParamType = {
  createArticle?: CreateArticleInboundPortOutputDto;
  readArticles?: ReadArticlesInboundPortOutputDto;
  readAnArticle?: ReadAnArticleInboundPortOutputDto;
  updateArticle?: UpdateArticleInboundPortOutputDto;
  removeArticle?: RemoveArticleInboundPortOutputDto;
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
  async readArticles(
    params: ReadArticlesInboundPortInputDto,
  ): Promise<ReadArticlesInboundPortOutputDto> {
    return this.result.readArticles;
  }
  async readAnArticle(
    params: ReadAnArticleInboundPortInputDto,
  ): Promise<ReadAnArticleInboundPortOutputDto> {
    return this.result.readAnArticle;
  }
  async updateArticle(
    params: UpdateArticleInboundPortInputDto,
  ): Promise<UpdateArticleInboundPortOutputDto> {
    return this.result.updateArticle;
  }
  async removeArticle(
    params: RemoveArticleInboundPortInputDto,
  ): Promise<RemoveArticleInboundPortOutputDto> {
    return this.result.removeArticle;
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

  test('Read Articles', async () => {
    const articles = [
      {
        id: '1',
        title: 'Test Article Title',
        content: 'Test Article Content',
        userId: '1',
        articleAreaId: 1,
        articleTypeId: 1,
        createdAt: new Date('2023-01-01'),
      },
      {
        id: '2',
        title: 'Test Article Title2',
        content: 'Test Article Content2',
        userId: '2',
        articleAreaId: 2,
        articleTypeId: 2,
        createdAt: new Date('2023-01-02'),
      },
      {
        id: '3',
        title: 'Test Article Title2',
        content: 'Test Article Content2',
        userId: '3',
        articleAreaId: 1,
        articleTypeId: 2,
        createdAt: new Date('2023-01-03'),
      },
      {
        id: '4',
        title: 'Test Article Title2',
        content: 'Test Article Content2',
        userId: '4',
        articleAreaId: 2,
        articleTypeId: 1,
        createdAt: new Date('2023-01-04'),
      },
      {
        id: '5',
        title: 'Test Article Title2',
        content: 'Test Article Content2',
        userId: '5',
        articleAreaId: 2,
        articleTypeId: 2,
        createdAt: new Date('2023-01-05'),
      },
      {
        id: '6',
        title: 'Test Article Title2',
        content: 'Test Article Content2',
        userId: '6',
        articleAreaId: 2,
        articleTypeId: 2,
        createdAt: new Date('2023-01-06'),
      },
      {
        id: '7',
        title: 'Test Article Title2',
        content: 'Test Article Content2',
        userId: '7',
        articleAreaId: 1,
        articleTypeId: 1,
        createdAt: new Date('2023-01-07'),
      },
    ];

    const perPage = 7;
    const currentPage = 1;

    const query = {
      perPage: perPage,
      currentPage: currentPage,
    };

    const articleController = new ArticleController(
      new MockArticleControllerInboundPort({
        readArticles: {
          articleCount: articles.length,
          articles: articles,
          currentPage: currentPage,
          pageCount: Math.ceil(articles.length / perPage),
          perPage: perPage,
        },
      }),
    );

    const res = await articleController.readArticles(query);

    expect(res).toStrictEqual({
      articleCount: articles.length,
      articles: articles,
      currentPage: currentPage,
      pageCount: Math.ceil(articles.length / perPage),
      perPage: perPage,
    });
  });

  test('Read An Article', async () => {
    const articleId = '1';

    const article: ReadAnArticleInboundPortOutputDto = {
      id: articleId,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'test title',
      content: 'hello, world!',
      user: {
        id: '1',
      },
      articleArea: {
        id: 1,
        area: 'Seoul',
      },
      articleType: {
        id: 1,
        type: 'Job Posting',
      },
      comments: [],
      jobPosting: null,
    };

    const articleController = new ArticleController(
      new MockArticleControllerInboundPort({ readAnArticle: article }),
    );

    const res = await articleController.readAnArticle(articleId);

    expect(res).toStrictEqual(article);
  });

  test('Update Article', async () => {
    const affected: UpdateArticleInboundPortOutputDto = {
      affected: 1,
    };

    const body: Omit<UpdateArticleInboundPortInputDto, 'articleId' | 'userId'> =
      {
        title: 'test update title',
        content: 'test update content',
        articleAreaId: 1,
        articleTypeId: 1,
      };

    const articleId = '1';

    const articleController = new ArticleController(
      new MockArticleControllerInboundPort({ updateArticle: affected }),
    );

    const res = await articleController.updateArticle(articleId, body, {
      id: '1',
    });

    expect(res).toStrictEqual({ affected: 1 });
  });

  test('Remove Article', async () => {
    const affected: RemoveArticleInboundPortOutputDto = {
      affected: 1,
    };

    const articleId = '1';

    const articleController = new ArticleController(
      new MockArticleControllerInboundPort({ removeArticle: affected }),
    );

    const res = await articleController.deleteArticle(articleId, { id: '1' });

    expect(res).toStrictEqual({ affected: 1 });
  });
});
