import { ARTICLE_TYPE } from 'src/common/article/article-type.constant';
import { CreateArticleInboundPortInputDto } from 'src/inbound-ports/article/article-controller.inbound-port';
import {
  ArticleRepositoryOutboundPort,
  SaveCommonArticleOutboundPortInputDto,
  SaveCommonArticleOutboundPortOutputDto,
  SaveJobPostingOutboundPortOutputDto,
  SaveJogPostingOutboundPortInputDto,
} from 'src/outbound-ports/article/article-repository.outbound-port';
import { ArticleService } from 'src/services/article.service';

type MockArticleRepositoryOutboundPortParamType = {
  saveCommonArticle?: SaveCommonArticleOutboundPortOutputDto;
  saveJogPosting?: SaveJobPostingOutboundPortOutputDto;
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
});
