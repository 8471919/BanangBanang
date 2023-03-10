import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/common/error-message';
import { ArticleEntity } from 'src/entities/article/article.entity';
import {
  ArticleRepositoryOutboundPort,
  FindAllArticlesOutboundPortInputDto,
  FindAllArticlesOutboundPortOutputDto,
  SaveCommonArticleOutboundPortInputDto,
  SaveCommonArticleOutboundPortOutputDto,
  SaveJobPostingOutboundPortOutputDto,
  SaveJogPostingOutboundPortInputDto,
} from 'src/outbound-ports/article/article-repository.outbound-port';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleRepository implements ArticleRepositoryOutboundPort {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async saveCommonArticle(
    params: SaveCommonArticleOutboundPortInputDto,
  ): Promise<SaveCommonArticleOutboundPortOutputDto> {
    const article = await this.articleRepository.save({
      ...params,
    });
    console.log(article);

    return { articleId: article.id };
  }

  async saveJobPosting(
    params: SaveJogPostingOutboundPortInputDto,
  ): Promise<SaveJobPostingOutboundPortOutputDto> {
    const article = await this.articleRepository.save({
      title: params.title,
      content: params.content,
      userId: params.userId,
      articleAreaId: params.articleAreaId,
      articleTypeId: params.articleTypeId,
      jobPosting: {
        companyName: params.companyName,
        expirationDate: params.expirationDate,
      },
    });
    return { articleId: article.id };
  }

  async findAllArticles(
    params: FindAllArticlesOutboundPortInputDto,
  ): Promise<FindAllArticlesOutboundPortOutputDto> {
    try {
      let query = this.articleRepository
        .createQueryBuilder('a')
        .select([
          'a.id',
          'a.title',
          'a.createdAt',
          'a.userId',
          'a.articleTypeId',
          'a.articleAreaId',
        ]);

      // 유저 Id에 따른 게시글 리스트 불러오기 (undefined시 모든 유저의 게시글을 불러온다)
      if (params.userId) {
        query = query.where('a.userId = :userId', { userId: params.userId });
      }

      // 게시글 유형에 따른 필터 (undefined시 모든 유형의 게시글을 불러온다)
      if (params.articleTypeId) {
        query = query.andWhere('a.articleTypeId = :articleTypeId', {
          articleTypeId: params.articleTypeId,
        });
      }

      // 게시글 지역에 따른 필터 (undefined시 모든 지역의 게시글을 불러온다)
      if (params.articleAreaId) {
        query = query.andWhere('a.articleAreaId = :articleAreaId', {
          articleAreaId: params.articleAreaId,
        });
      }

      // 조건에 맞는 게시글의 총 개수를 반환
      const articleCount = await query.getCount();

      // 순서 정렬, order 속성에는 디폴트값으로 createdAt과 DESC가 들어갈 것
      if (!params.order.type) {
        params['order'] = { type: 'createdAt', order: 'DESC' };
      }
      query = query.orderBy(`a.${params.order.type}`, `${params.order.order}`);

      // 몇 번째 페이지를 불러오는지 설정
      query = query.skip(params.perPage * (params.currentPage - 1));

      // 몇 개의 게시글을 불러오는지 설정
      query = query.take(params.perPage);

      const articles = await query.getRawMany();

      return { articles, articleCount };
    } catch (e) {
      console.log(e);
      throw new BadRequestException(ERROR_MESSAGE.FAIL_TO_GET_ARTICLE);
    }
  }
}
