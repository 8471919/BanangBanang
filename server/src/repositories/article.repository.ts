import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/common/error-message';
import { ArticleEntity } from 'src/entities/article/article.entity';
import {
  ArticleRepositoryOutboundPort,
  RemoveArticleOutboundPortInputDto,
  RemoveArticleOutboundPortOutputDto,
  FindAllArticlesOutboundPortInputDto,
  FindAllArticlesOutboundPortOutputDto,
  FindOneArticleOutboundPortInputDto,
  FindOneArticleOutboundPortOutputDto,
  SaveCommonArticleOutboundPortInputDto,
  SaveCommonArticleOutboundPortOutputDto,
  SaveJobPostingOutboundPortOutputDto,
  SaveJogPostingOutboundPortInputDto,
  UpdateCommonArticleOutboundPortInputDto,
  UpdateCommonArticleOutboundPortOutputDto,
  UpdateJobPostingOutboundPortInputDto,
  UpdateJobPostingOutboundPortOutputDto,
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
          'a.id as "id"',
          'a.title as "title"',
          'a.createdAt as "createdAt"',
          'a.userId as "userId"',
          'a.articleTypeId as "articleTypeId"',
          'a.articleAreaId as "articleAreaId"',
        ]);

      // 유저 Id에 따른 게시글 리스트 불러오기 (undefined시 모든 유저의 게시글을 불러온다)
      if (params.userId) {
        query = query.where('userId = :userId', { userId: params.userId });
      }

      // 게시글 유형에 따른 필터 (undefined시 모든 유형의 게시글을 불러온다)
      if (params.articleTypeId) {
        query = query.andWhere('articleTypeId = :articleTypeId', {
          articleTypeId: params.articleTypeId,
        });
      }

      // 게시글 지역에 따른 필터 (undefined시 모든 지역의 게시글을 불러온다)
      if (params.articleAreaId) {
        query = query.andWhere('articleAreaId = :articleAreaId', {
          articleAreaId: params.articleAreaId,
        });
      }

      // 순서 정렬, order 속성에는 디폴트값으로 createdAt과 DESC가 들어갈 것
      if (!params.order.type) {
        params['order'] = { type: '"createdAt"', order: 'DESC' };
      }
      query = query.orderBy(`${params.order.type}`, `${params.order.order}`);

      // 몇 번째 페이지를 불러오는지 설정
      query = query.skip(params.perPage * (params.currentPage - 1));

      // 몇 개의 게시글을 불러오는지 설정
      query = query.take(params.perPage);

      const articles = await query.getRawMany();

      // 조건에 맞는 게시글의 총 개수를 반환
      const articleCount = await query.getCount();

      return { articles, articleCount };
    } catch (e) {
      console.log(e);
      throw new BadRequestException(ERROR_MESSAGE.FAIL_TO_GET_ARTICLE);
    }
  }

  async findOneArticle(
    params: FindOneArticleOutboundPortInputDto,
  ): Promise<FindOneArticleOutboundPortOutputDto> {
    const article = await this.articleRepository
      .createQueryBuilder('a')
      .select([
        'a.id',
        'a.createdAt',
        'a.updatedAt',
        'a.title',
        'a.content',
        'u.id',
      ])
      .innerJoin('a.user', 'u', 'u.id = a.userId')
      .innerJoinAndSelect('a.articleArea', 'aa', 'a.articleAreaId = aa.id')
      .innerJoinAndSelect('a.articleType', 'at', 'a.articleTypeId = at.id')
      .leftJoinAndSelect('a.comments', 'c', 'a.id = c.articleId')
      .leftJoinAndSelect('a.jobPosting', 'j', 'j.articleId = a.id')
      .where('a.id = :articleId', { articleId: params.articleId })
      .take(1)
      .getOne();

    return article;
  }

  async updateCommonArticle(
    params: UpdateCommonArticleOutboundPortInputDto,
  ): Promise<UpdateCommonArticleOutboundPortOutputDto> {
    const article = await this.articleRepository.update(
      {
        id: params.articleId,
        userId: params.userId,
      },
      {
        title: params.title,
        content: params.content,
        articleAreaId: params.articleAreaId,
        articleTypeId: params.articleTypeId,
      },
    );

    console.log(article);

    return { affected: article?.affected };
  }

  async updateJobPosting(
    params: UpdateJobPostingOutboundPortInputDto,
  ): Promise<UpdateJobPostingOutboundPortOutputDto> {
    const article = await this.articleRepository.update(
      {
        id: params.articleId,
        userId: params.userId,
      },
      {
        title: params.title,
        content: params.content,
        articleAreaId: params.articleAreaId,
        jobPosting: {
          companyName: params.companyName,
          expirationDate: params.expirationDate,
        },
      },
    );

    console.log(article);

    return { affected: article?.affected };
  }

  async removeArticle(
    params: RemoveArticleOutboundPortInputDto,
  ): Promise<RemoveArticleOutboundPortOutputDto> {
    const article = await this.articleRepository.softDelete({
      id: params.articleId,
      userId: params.userId,
    });

    console.log(article);
    if (article?.affected === 0) {
      throw new BadRequestException(ERROR_MESSAGE.FAIL_TO_DELETE_ARTICLE);
    }

    return { affected: article?.affected };
  }
}
