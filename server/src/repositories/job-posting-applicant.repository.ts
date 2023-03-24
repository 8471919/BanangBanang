import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPostingApplicantEntity } from 'src/entities/article/job-posting-applicant.entity';
import {
  JobPostingApplicantRepositoryOutboundPort,
  SaveJobPostingApplicantOutboundPortInputDto,
  SaveJobPostingApplicantOutboundPortOutputDto,
} from 'src/outbound-ports/article/job-posting-appicant-repository.outbound-port';
import { Repository } from 'typeorm';

@Injectable()
export class JobPostingApplicantRepository
  implements JobPostingApplicantRepositoryOutboundPort
{
  constructor(
    @InjectRepository(JobPostingApplicantEntity)
    private readonly jobPostingApplicantRepository: Repository<JobPostingApplicantEntity>,
  ) {}

  async saveJobPostingApplicant(
    params: SaveJobPostingApplicantOutboundPortInputDto,
  ): Promise<SaveJobPostingApplicantOutboundPortOutputDto> {
    const applicant = this.jobPostingApplicantRepository.save({});

    return {};
  }
}
