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
export type FindOneArticleOutboundPortOutputDto = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  user: {
    id: string;
  };
  articleArea: {
    id: number;
    area: string;
  };
  articleType: {
    id: number;
    type: string;
  };
  comments?: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    content: string;
    parentId: string;
    depth: number;
  }[];
  jobPosting?: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    companyName: string;
    expirationDate: Date;
  };
};

export type UpdateCommonArticleOutboundPortInputDto = {
  articleId: string;
  title: string;
  content: string;
  articleAreaId: number;
  articleTypeId: number;
};
export type UpdateCommonArticleOutboundPortOutputDto = {
  articleId: string;
};

export type UpdateJobPostingOutboundPortInputDto = {
  articleId: string;
  title: string;
  content: string;
  articleAreaId: number;
  articleTypeId: number;
  companyName: string;
  expirationDate: Date;
};
export type UpdateJobPostingOutboundPortOutputDto = {
  articleId: string;
};

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

  updateCommonArticle(
    params: UpdateCommonArticleOutboundPortInputDto,
  ): Promise<UpdateCommonArticleOutboundPortOutputDto>;

  updateJobPosting(
    params: UpdateJobPostingOutboundPortInputDto,
  ): Promise<UpdateJobPostingOutboundPortOutputDto>;
}
