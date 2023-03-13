import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ARTICLE_TYPE } from 'src/common/article/article-type.constant';
import { ERROR_MESSAGE } from 'src/common/error-message';
import {
  ArticleControllerInboundPort,
  CreateArticleInboundPortInputDto,
  CreateArticleInboundPortOutputDto,
  ReadArticlesInboundPortInputDto,
  ReadArticlesInboundPortOutputDto,
} from 'src/inbound-ports/article/article-controller.inbound-port';
import {
  ArticleRepositoryOutboundPort,
  ARTICLE_REPOSITORY_OUTBOUND_PORT,
} from 'src/outbound-ports/article/article-repository.outbound-port';

@Injectable()
export class ArticleService implements ArticleControllerInboundPort {
  constructor(
    @Inject(ARTICLE_REPOSITORY_OUTBOUND_PORT)
    private readonly articleRepositoryOutboundPort: ArticleRepositoryOutboundPort,
  ) {}

  async createArticle(
    params: CreateArticleInboundPortInputDto,
  ): Promise<CreateArticleInboundPortOutputDto> {
    console.log('create Article service');
    console.log(params);
    // 게시글 타입이 Common인 경우
    if (params.articleTypeId === ARTICLE_TYPE.COMMON) {
      console.log('common article');
      return await this.articleRepositoryOutboundPort.saveCommonArticle(params);
    }

    // 게시글 타입이 Job Posting인 경우
    if (params.articleTypeId === ARTICLE_TYPE.JOB_POSTING) {
      if (!params.companyName || !params.expirationDate) {
        throw new BadRequestException(ERROR_MESSAGE.FAIL_TO_JOB_POSTING);
      }
      console.log('job posting');
      return await this.articleRepositoryOutboundPort.saveJobPosting({
        title: params.title,
        content: params.content,
        userId: params.userId,
        articleAreaId: params.articleAreaId,
        articleTypeId: params.articleTypeId,
        companyName: params.companyName,
        expirationDate: params.expirationDate,
      });
    }
  }

  async readArticles(
    params: ReadArticlesInboundPortInputDto,
  ): Promise<ReadArticlesInboundPortOutputDto> {
    const { articles, articleCount } =
      await this.articleRepositoryOutboundPort.findAllArticles(params);

    const res: ReadArticlesInboundPortOutputDto = {
      articleCount: articleCount,
      articles: articles,
      currentPage: params.currentPage,
      pageCount: Math.ceil(articleCount / params.perPage),
      perPage: params.perPage,
    };

    return res;
  }
}
