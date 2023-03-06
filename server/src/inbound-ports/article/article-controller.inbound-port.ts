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

export interface ArticleControllerInboundPort {
  createArticle(
    params: CreateArticleInboundPortInputDto,
  ): Promise<CreateArticleInboundPortOutputDto>;
}
