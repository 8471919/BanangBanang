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

export interface ArticleRepositoryOutboundPort {
  saveCommonArticle(
    params: SaveCommonArticleOutboundPortInputDto,
  ): Promise<SaveCommonArticleOutboundPortOutputDto>;

  saveJobPosting(
    params: SaveJogPostingOutboundPortInputDto,
  ): Promise<SaveJobPostingOutboundPortOutputDto>;
}
