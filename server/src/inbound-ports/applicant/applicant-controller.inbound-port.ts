export const APPLICANT_CONTROLLER_INBOUND_PORT =
  'APPLICANT_CONTROLLER_INBOUND_PORT' as const;

export type CreateJobPostingApplicantInboundPortInputDto = {
  articleId: string;
  name: string;
  birth: Date;
  content: string;
  userId: string;
};
export type CreateJobPostingApplicantInboundPortOutputDto = {
  applicant: {
    articleId: string;
    name: string;
    birth: Date;
    content: string;
    userId: string;
  };
};
export interface ApplicantControllerInboundPort {
  createJobPostingApplicant(
    params: CreateJobPostingApplicantInboundPortInputDto,
  ): Promise<CreateJobPostingApplicantInboundPortOutputDto>;
}
