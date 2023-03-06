export const ARTICLE_REPOSITORY_OUTBOUND_PORT =
  'ARTICLE_REPOSITORY_OUTBOUND_PORT' as const;

export type SaveArticleOutboundPortInputDto = {
  title: string;
  content: string;
  userId: string;
  articleAreaId: number;
  articleTypeId: number;
  companyName?: string;
  expirationDate?: string;
};
export type SaveArticleOutboundPortOutputDto = {
  articleId: string;
};

export interface ArticleRepositoryOutboundPort {
  saveArticle(
    params: SaveArticleOutboundPortInputDto,
  ): Promise<SaveArticleOutboundPortOutputDto>;
}
