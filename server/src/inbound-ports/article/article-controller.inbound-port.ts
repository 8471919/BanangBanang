import { ArticleEntity } from 'src/entities/article/article.entity';

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

export type ReadAnArticleInboundPortInputDto = {
  articleId: string;
};
export type ReadAnArticleInboundPortOutputDto = {
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

export type UpdateArticleInboundPortInputDto = {
  userId: string;
  articleId: string;
  title: string;
  content: string;
  articleAreaId: number;
  articleTypeId: number;
  companyName?: string;
  expirationDate?: Date;
};
export type UpdateArticleInboundPortOutputDto = {
  affected: number | undefined;
};

export type RemoveArticleInboundPortInputDto = {
  userId: string;
  articleId: string;
};
export type RemoveArticleInboundPortOutputDto = {
  affected: number | undefined;
};

export type ReadApplicantsByArticleIdInboundPortInputDto = {
  articleId: string;
  userId: string;
};
export type ReadApplicantsByArticleIdInboundPortOutputDto = {
  applicants: Array<{
    id: string;
    name: string;
    birth: Date;
    content: string;
    userId: string;
    applicantTypeId: number;
  }>;
};

export interface ArticleControllerInboundPort {
  createArticle(
    params: CreateArticleInboundPortInputDto,
  ): Promise<CreateArticleInboundPortOutputDto>;

  readArticles(
    params: ReadArticlesInboundPortInputDto,
  ): Promise<ReadArticlesInboundPortOutputDto>;

  readAnArticle(
    params: ReadAnArticleInboundPortInputDto,
  ): Promise<ReadAnArticleInboundPortOutputDto>;

  updateArticle(
    params: UpdateArticleInboundPortInputDto,
  ): Promise<UpdateArticleInboundPortOutputDto>;

  removeArticle(
    params: RemoveArticleInboundPortInputDto,
  ): Promise<RemoveArticleInboundPortOutputDto>;

  readApplicantsByArticleId(
    params: ReadApplicantsByArticleIdInboundPortInputDto,
  ): Promise<ReadApplicantsByArticleIdInboundPortOutputDto>;
}
