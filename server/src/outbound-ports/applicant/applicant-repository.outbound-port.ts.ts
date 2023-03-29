export const APPLICANT_REPOSITORY_OUTBOUND_PORT =
  'APPLICANT_REPOSITORY_OUTBOUND_PORT' as const;

export type SaveJobPostingApplicantOutboundPortInputDto = {
  articleId: string;
  name: string;
  birth: Date;
  content: string;
  userId: string;
};
export type SaveJobPostingApplicantOutboundPortOutputDto = {
  applicant: {
    articleId: string;
    name: string;
    birth: Date;
    content: string;
    userId: string;
  };
};

export type FindApplicantsByArticleIdOutboundPortInputDto = {
  articleId: string;
  userId: string;
};
export type FindApplicantsByArticleIdOutboundPortOutputDto = {
  applicants: Array<{
    id: string;
    name: string;
    birth: Date;
    content: string;
    userId: string;
    applicantTypeId: number;
  }>;
};

export interface ApplicantRepositoryOutboundPort {
  saveJobPostingApplicant(
    params: SaveJobPostingApplicantOutboundPortInputDto,
  ): Promise<SaveJobPostingApplicantOutboundPortOutputDto>;

  findApplicantsByArticleId(
    params: FindApplicantsByArticleIdOutboundPortInputDto,
  ): Promise<FindApplicantsByArticleIdOutboundPortOutputDto>;
}
