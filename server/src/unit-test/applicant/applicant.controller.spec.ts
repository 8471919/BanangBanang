import { ApplicantController } from 'src/controllers/applicant.controller';
import {
  ApplicantControllerInboundPort,
  CreateJobPostingApplicantInboundPortInputDto,
  CreateJobPostingApplicantInboundPortOutputDto,
} from 'src/inbound-ports/applicant/applicant-controller.inbound-port';

type MockApplicantControllerInboundPortParamType = {
  createJobPostingApplicant?: CreateJobPostingApplicantInboundPortOutputDto;
};

class MockApplicantControllerInboundPort
  implements ApplicantControllerInboundPort
{
  private readonly result: MockApplicantControllerInboundPortParamType;

  constructor(result: MockApplicantControllerInboundPortParamType) {
    this.result = result;
  }

  async createJobPostingApplicant(
    params: CreateJobPostingApplicantInboundPortInputDto,
  ): Promise<CreateJobPostingApplicantInboundPortOutputDto> {
    return this.result.createJobPostingApplicant;
  }
}

describe('Applicant Controller Spec', () => {
  test('Apply Job Posting', async () => {
    const applicant: CreateJobPostingApplicantInboundPortOutputDto = {
      applicant: {
        articleId: '1',
        birth: new Date('2000-01-01'),
        content: '지원 내용 혹은 파일',
        name: '김시험',
        userId: '1',
      },
    };

    const applicantController = new ApplicantController(
      new MockApplicantControllerInboundPort({
        createJobPostingApplicant: applicant,
      }),
    );

    const body = {
      articleId: '1',
      birth: new Date('2000-01-01'),
      content: '지원 내용 혹은 파일',
      name: '김시험',
      userId: '1',
    };

    const res = await applicantController.createJobPostingApplicant(
      {
        id: '1',
      },
      body,
    );

    // 이런식으로 Test할거면 굳이 Test가 필요없지 않나? 왜하는거지?
    expect(res).toStrictEqual(applicant);
  });
});
