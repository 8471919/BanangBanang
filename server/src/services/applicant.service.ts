import { Inject, Injectable } from '@nestjs/common';
import {
  ApplicantControllerInboundPort,
  CreateJobPostingApplicantInboundPortInputDto,
  CreateJobPostingApplicantInboundPortOutputDto,
} from 'src/inbound-ports/applicant/applicant-controller.inbound-port';
import {
  ApplicantRepositoryOutboundPort,
  APPLICANT_REPOSITORY_OUTBOUND_PORT,
} from 'src/outbound-ports/applicant/applicant-repository.outbound-port.ts';

@Injectable()
export class ApplicantService implements ApplicantControllerInboundPort {
  constructor(
    @Inject(APPLICANT_REPOSITORY_OUTBOUND_PORT)
    private readonly ApplicantRepositoryOutbountPort: ApplicantRepositoryOutboundPort,
  ) {}

  async createJobPostingApplicant(
    params: CreateJobPostingApplicantInboundPortInputDto,
  ): Promise<CreateJobPostingApplicantInboundPortOutputDto> {
    const applicant =
      await this.ApplicantRepositoryOutbountPort.saveJobPostingApplicant(
        params,
      );

    return applicant;
  }
}
