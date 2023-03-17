import { ARTICLE_TYPE } from 'src/common/article/article-type.constant';
import { ArticleEntity } from 'src/entities/article/article.entity';
import {
  CreateArticleInboundPortInputDto,
  ReadArticlesInboundPortInputDto,
} from 'src/inbound-ports/article/article-controller.inbound-port';
import {
  ArticleRepositoryOutboundPort,
  FindAllArticlesOutboundPortInputDto,
  FindAllArticlesOutboundPortOutputDto,
  FindOneArticleOutboundPortInputDto,
  FindOneArticleOutboundPortOutputDto,
  SaveCommonArticleOutboundPortInputDto,
  SaveCommonArticleOutboundPortOutputDto,
  SaveJobPostingOutboundPortOutputDto,
  SaveJogPostingOutboundPortInputDto,
} from 'src/outbound-ports/article/article-repository.outbound-port';
import { ArticleService } from 'src/services/article.service';

type MockArticleRepositoryOutboundPortParamType = {
  saveCommonArticle?: SaveCommonArticleOutboundPortOutputDto;
  saveJogPosting?: SaveJobPostingOutboundPortOutputDto;
  findAllArticles?: FindAllArticlesOutboundPortOutputDto;
  findOneArticle?: FindOneArticleOutboundPortOutputDto;
};

class MockArticleRepositoryOutboundPort
  implements ArticleRepositoryOutboundPort
{
  private readonly result: MockArticleRepositoryOutboundPortParamType;

  constructor(result: MockArticleRepositoryOutboundPortParamType) {
    this.result = result;
  }
  async saveCommonArticle(
    params: SaveCommonArticleOutboundPortInputDto,
  ): Promise<SaveCommonArticleOutboundPortOutputDto> {
    return this.result.saveCommonArticle;
  }
  async saveJobPosting(
    params: SaveJogPostingOutboundPortInputDto,
  ): Promise<SaveJobPostingOutboundPortOutputDto> {
    return this.result.saveJogPosting;
  }
  async findAllArticles(
    params: FindAllArticlesOutboundPortInputDto,
  ): Promise<FindAllArticlesOutboundPortOutputDto> {
    return this.result.findAllArticles;
  }
  async findOneArticle(
    params: FindOneArticleOutboundPortInputDto,
  ): Promise<FindOneArticleOutboundPortOutputDto> {
    return this.result.findOneArticle;
  }
}

describe('ArticleService Spec', () => {
  test('create Common Article', async () => {
    const article: CreateArticleInboundPortInputDto = {
      title: 'Test article',
      content: 'Hello, World!',
      userId: '1',
      articleAreaId: 1,
      articleTypeId: ARTICLE_TYPE.COMMON,
    };

    const articleService = new ArticleService(
      new MockArticleRepositoryOutboundPort({
        saveCommonArticle: { articleId: '1' },
      }),
    );

    const res = await articleService.createArticle(article);

    expect(res).toStrictEqual({ articleId: '1' });
  });

  test('create Job Posting', async () => {
    const article: CreateArticleInboundPortInputDto = {
      title: 'Test article',
      content: 'Hello, World!',
      userId: '1',
      articleAreaId: 1,
      articleTypeId: ARTICLE_TYPE.JOB_POSTING,
      companyName: 'Test company',
      expirationDate: '2023-12-31',
    };

    const articleService = new ArticleService(
      new MockArticleRepositoryOutboundPort({
        saveJogPosting: { articleId: '1' },
      }),
    );

    const res = await articleService.createArticle(article);

    expect(res).toStrictEqual({ articleId: '1' });
  });

  test('read Article List', async () => {
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

    const params: ReadArticlesInboundPortInputDto = {
      currentPage: 1,
      perPage: 7,
    };

    const articleService = new ArticleService(
      new MockArticleRepositoryOutboundPort({
        findAllArticles: { articles, articleCount: articles.length },
      }),
    );

    const res = await articleService.readArticles(params);

    expect(res).toStrictEqual({
      articleCount: 7,
      articles: articles,
      currentPage: 1,
      pageCount: Math.ceil(articles.length / params.perPage),
      perPage: params.perPage,
    });
  });

  test('Read One Article', async () => {
    const articleId = '1';

    const article: FindOneArticleOutboundPortOutputDto = {
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

    const articleService = new ArticleService(
      new MockArticleRepositoryOutboundPort({ findOneArticle: article }),
    );

    const res = await articleService.readAnArticle({ articleId: articleId });

    expect(res).toStrictEqual(article);
  });
});
