import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantEntity } from 'src/entities/applicant/applicant.entity';
import {
  ApplicantRepositoryOutboundPort,
  SaveJobPostingApplicantOutboundPortInputDto,
  SaveJobPostingApplicantOutboundPortOutputDto,
} from 'src/outbound-ports/applicant/applicant-repository.outbound-port.ts';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicantRepository implements ApplicantRepositoryOutboundPort {
  constructor(
    @InjectRepository(ApplicantEntity)
    private readonly applicantRepository: Repository<ApplicantEntity>,
  ) {}

  async saveJobPostingApplicant(
    params: SaveJobPostingApplicantOutboundPortInputDto,
  ): Promise<SaveJobPostingApplicantOutboundPortOutputDto> {
    const applicant = await this.applicantRepository.save({
      articleId: params.articleId,
      name: params.name,
      birth: params.birth,
      content: params.content,
      userId: params.userId,
      applicantTypeId: 1,
    });

    return { applicant };
  }
}
