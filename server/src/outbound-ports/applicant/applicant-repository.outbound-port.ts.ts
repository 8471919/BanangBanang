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

export interface ApplicantRepositoryOutboundPort {
  saveJobPostingApplicant(
    params: SaveJobPostingApplicantOutboundPortInputDto,
  ): Promise<SaveJobPostingApplicantOutboundPortOutputDto>;
}
