export const ARTICLE_REPOSITORY_OUTBOUND_PORT =
  'ARTICLE_REPOSITORY_OUTBOUND_PORT' as const;

export type SaveCommonArticleOutboundPortInputDto = {
  title: string;
  content: string;
  userId: string;
  articleAreaId: number;
  articleTypeId: number;
};
export type SaveCommonArticleOutboundPortOutputDto = {
  articleId: string;
};

export type SaveJogPostingOutboundPortInputDto = {
  title: string;
  content: string;
  userId: string;
  articleAreaId: number;
  articleTypeId: number;
  companyName: string;
  expirationDate: string;
};
export type SaveJobPostingOutboundPortOutputDto = {
  articleId: string;
};

export type FindAllArticlesOutboundPortInputDto = {
  userId?: string;
  articleTypeId?: number;
  articleAreaId?: number;
  order?: {
    type: string;
    order: 'ASC' | 'DESC';
  };
  perPage: number;
  currentPage: number;
};
export type FindAllArticlesOutboundPortOutputDto = {
  articles: any[];
  articleCount: number;
};

export type FindOneArticleOutboundPortInputDto = {
  articleId: string;
};
export type FindOneArticleOutboundPortOutputDto = {};

export interface ArticleRepositoryOutboundPort {
  saveCommonArticle(
    params: SaveCommonArticleOutboundPortInputDto,
  ): Promise<SaveCommonArticleOutboundPortOutputDto>;

  saveJobPosting(
    params: SaveJogPostingOutboundPortInputDto,
  ): Promise<SaveJobPostingOutboundPortOutputDto>;

  findAllArticles(
    params: FindAllArticlesOutboundPortInputDto,
  ): Promise<FindAllArticlesOutboundPortOutputDto>;

  findOneArticle(
    params: FindOneArticleOutboundPortInputDto,
  ): Promise<FindOneArticleOutboundPortOutputDto>;
}
