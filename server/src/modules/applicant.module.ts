import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantController } from 'src/controllers/applicant.controller';
import { JobPostingApplicantEntity } from 'src/entities/article/job-posting-applicant.entity';
import { APPLICANT_CONTROLLER_INBOUND_PORT } from 'src/inbound-ports/applicant/applicant-controller.inbound-port';
import { JOB_POSTING_APPLICANT_REPOSITORy_OUTBOUND_PORT } from 'src/outbound-ports/applicant/job-posting-appicant-repository.outbound-port';
import { JobPostingApplicantRepository } from 'src/repositories/job-posting-applicant.repository';
import { ApplicantService } from 'src/services/applicant.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobPostingApplicantEntity])],
  controllers: [ApplicantController],
  providers: [
    {
      provide: APPLICANT_CONTROLLER_INBOUND_PORT,
      useClass: ApplicantService,
    },
    {
      provide: JOB_POSTING_APPLICANT_REPOSITORy_OUTBOUND_PORT,
      useClass: JobPostingApplicantRepository,
    },
    ApplicantService,
  ],
})
export class ApplicantModule {}
