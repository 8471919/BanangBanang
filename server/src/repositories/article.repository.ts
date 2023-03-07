import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/entities/article/article.entity';
import {
  ArticleRepositoryOutboundPort,
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
}
