export const ARTICLE_CONTROLLER_INBOUNT_PORT =
  'ARTICLE_CONTROLLER_INBOUNT_PORT' as const;

export type CreateArticleInboundPortInputDto = {
  title: string;
  content: string;
  userId: string;
  articleAreaId: number;
  articleTypeId: number;
  companyName?: string;
  expirationDate?: string;
};
export type CreateArticleInboundPortOutputDto = {
  articleId: string;
};

export type ReadArticlesInboundPortInputDto = {
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
export type ReadArticlesInboundPortOutputDto = {
  articles: any[];
  articleCount: number;
  perPage: number;
  currentPage: number;
  pageCount: number; // 총 몇 페이지까지 있는지 = 마지막 페이지 번호
};

export interface ArticleControllerInboundPort {
  createArticle(
    params: CreateArticleInboundPortInputDto,
  ): Promise<CreateArticleInboundPortOutputDto>;

  readArticles(
    params: ReadArticlesInboundPortInputDto,
  ): Promise<ReadArticlesInboundPortOutputDto>;
}
