import { ARTICLE_TYPE } from 'src/common/article/article-type.constant';
import { ArticleEntity } from 'src/entities/article/article.entity';
import {
  CreateArticleInboundPortInputDto,
  ReadArticlesInboundPortInputDto,
} from 'src/inbound-ports/article/article-controller.inbound-port';
import { FindApplicantsByArticleIdOutboundPortOutputDto } from 'src/outbound-ports/applicant/applicant-repository.outbound-port.ts';
import {
  ArticleRepositoryOutboundPort,
  FindAllArticlesOutboundPortInputDto,
  FindAllArticlesOutboundPortOutputDto,
  FindOneArticleOutboundPortInputDto,
  FindOneArticleOutboundPortOutputDto,
  RemoveArticleOutboundPortInputDto,
  RemoveArticleOutboundPortOutputDto,
  SaveCommonArticleOutboundPortInputDto,
  SaveCommonArticleOutboundPortOutputDto,
  SaveJobPostingOutboundPortOutputDto,
  SaveJogPostingOutboundPortInputDto,
  UpdateCommonArticleOutboundPortInputDto,
  UpdateCommonArticleOutboundPortOutputDto,
  UpdateJobPostingOutboundPortInputDto,
  UpdateJobPostingOutboundPortOutputDto,
} from 'src/outbound-ports/article/article-repository.outbound-port';
import { ArticleService } from 'src/services/article.service';
import { MockApplicantRepositoryOutboundPort } from '../applicant/applicant.service.spec';

type MockArticleRepositoryOutboundPortParamType = {
  saveCommonArticle?: SaveCommonArticleOutboundPortOutputDto;
  saveJogPosting?: SaveJobPostingOutboundPortOutputDto;
  findAllArticles?: FindAllArticlesOutboundPortOutputDto;
  findOneArticle?: FindOneArticleOutboundPortOutputDto;
  updateCommonArticle?: UpdateCommonArticleOutboundPortOutputDto;
  updateJobPosting?: UpdateJobPostingOutboundPortOutputDto;
  removeArticle?: RemoveArticleOutboundPortOutputDto;
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
  async updateCommonArticle(
    params: UpdateCommonArticleOutboundPortInputDto,
  ): Promise<UpdateCommonArticleOutboundPortOutputDto> {
    return this.result.updateCommonArticle;
  }
  async updateJobPosting(
    params: UpdateJobPostingOutboundPortInputDto,
  ): Promise<UpdateJobPostingOutboundPortOutputDto> {
    return this.result.updateJobPosting;
  }
  async removeArticle(
    params: RemoveArticleOutboundPortInputDto,
  ): Promise<RemoveArticleOutboundPortOutputDto> {
    return this.result.removeArticle;
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
      new MockApplicantRepositoryOutboundPort({}),
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
      new MockApplicantRepositoryOutboundPort({}),
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
      new MockApplicantRepositoryOutboundPort({}),
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
      new MockApplicantRepositoryOutboundPort({}),
    );

    const res = await articleService.readAnArticle({ articleId: articleId });

    expect(res).toStrictEqual(article);
  });

  test('Update Common Article', async () => {
    const article: UpdateCommonArticleOutboundPortInputDto = {
      userId: '1',
      articleId: '1',
      title: 'Test Update title',
      content: 'Test Update content',
      articleAreaId: 1,
      articleTypeId: 1,
    };

    const articleService = new ArticleService(
      new MockArticleRepositoryOutboundPort({
        updateCommonArticle: { affected: 1 },
      }),
      new MockApplicantRepositoryOutboundPort({}),
    );

    const res = await articleService.updateArticle(article);

    expect(res).toStrictEqual({ affected: 1 });
  });

  test('Update JobPosting', async () => {
    const article: UpdateJobPostingOutboundPortInputDto = {
      userId: '1',
      articleId: '1',
      title: 'Test Update title',
      content: 'Test Update content',
      articleAreaId: 1,
      articleTypeId: 2,
      companyName: 'Test company',
      expirationDate: new Date('2023-12-12'),
    };

    const articleService = new ArticleService(
      new MockArticleRepositoryOutboundPort({
        updateJobPosting: { affected: 1 },
      }),
      new MockApplicantRepositoryOutboundPort({}),
    );

    const res = await articleService.updateArticle(article);

    expect(res).toStrictEqual({ affected: 1 });
  });

  test('Remove Article', async () => {
    const affected: RemoveArticleOutboundPortOutputDto = {
      affected: 1,
    };

    const articleId = '1';

    const articleService = new ArticleService(
      new MockArticleRepositoryOutboundPort({ removeArticle: affected }),
      new MockApplicantRepositoryOutboundPort({}),
    );

    const res = await articleService.removeArticle({ articleId, userId: '1' });

    expect(res).toStrictEqual({ affected: 1 });
  });

  test('Read Applicants By Article Id', async () => {
    const applicants: FindApplicantsByArticleIdOutboundPortOutputDto = {
      applicants: [
        {
          id: '1',
          name: 'test applicant',
          birth: new Date('2000-01-01'),
          content: 'test applying content',
          userId: '2',
          applicantTypeId: 1,
        },
      ],
    };

    const articleService = new ArticleService(
      new MockArticleRepositoryOutboundPort({}),
      new MockApplicantRepositoryOutboundPort({
        findApplicantsByArticleId: applicants,
      }),
    );

    const res = await articleService.readApplicantsByArticleId({
      articleId: '1',
      userId: '2',
    });

    expect(res).toStrictEqual(applicants);
  });
});
