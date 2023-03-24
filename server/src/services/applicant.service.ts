import { Injectable } from '@nestjs/common';
import { ApplicantControllerInboundPort } from 'src/inbound-ports/applicant/applicant-controller.inbound-port';

@Injectable()
export class ApplicantService implements ApplicantControllerInboundPort {}
