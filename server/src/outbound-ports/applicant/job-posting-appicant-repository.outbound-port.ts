export const JOB_POSTING_APPLICANT_REPOSITORy_OUTBOUND_PORT =
  'JOB_POSTING_APPLICANT_REPOSITORy_OUTBOUND_PORT' as const;

export type SaveJobPostingApplicantOutboundPortInputDto = {};
export type SaveJobPostingApplicantOutboundPortOutputDto = {};

export interface JobPostingApplicantRepositoryOutboundPort {
  saveJobPostingApplicant(
    params: SaveJobPostingApplicantOutboundPortInputDto,
  ): Promise<SaveJobPostingApplicantOutboundPortOutputDto>;
}
