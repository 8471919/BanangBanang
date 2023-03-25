import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantController } from 'src/controllers/applicant.controller';
import { ApplicantEntity } from 'src/entities/applicant/applicant.entity';
import { APPLICANT_CONTROLLER_INBOUND_PORT } from 'src/inbound-ports/applicant/applicant-controller.inbound-port';
import { APPLICANT_REPOSITORY_OUTBOUND_PORT } from 'src/outbound-ports/applicant/applicant-repository.outbound-port.ts';
import { ApplicantRepository } from 'src/repositories/applicant.repository.ts';
import { ApplicantService } from 'src/services/applicant.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicantEntity])],
  controllers: [ApplicantController],
  providers: [
    {
      provide: APPLICANT_CONTROLLER_INBOUND_PORT,
      useClass: ApplicantService,
    },
    {
      provide: APPLICANT_REPOSITORY_OUTBOUND_PORT,
      useClass: ApplicantRepository,
    },
    ApplicantService,
  ],
})
export class ApplicantModule {}
