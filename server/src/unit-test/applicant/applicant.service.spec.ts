import {
  ApplicantRepositoryOutboundPort,
  SaveJobPostingApplicantOutboundPortInputDto,
  SaveJobPostingApplicantOutboundPortOutputDto,
} from 'src/outbound-ports/applicant/applicant-repository.outbound-port.ts';
import { ApplicantService } from 'src/services/applicant.service';

type MockApplicantRepositoryOutboundPortParamType = {
  saveJobPostingApplicant?: SaveJobPostingApplicantOutboundPortOutputDto;
};

class MockApplicantRepositoryOutboundPort
  implements ApplicantRepositoryOutboundPort
{
  private readonly result: MockApplicantRepositoryOutboundPortParamType;

  constructor(result: MockApplicantRepositoryOutboundPortParamType) {
    this.result = result;
  }

  async saveJobPostingApplicant(
    params: SaveJobPostingApplicantOutboundPortInputDto,
  ): Promise<SaveJobPostingApplicantOutboundPortOutputDto> {
    return this.result.saveJobPostingApplicant;
  }
}

describe('Applicant Service Spec', () => {
  test('Apply Job Posting', async () => {
    const applicant: SaveJobPostingApplicantOutboundPortOutputDto = {
      applicant: {
        articleId: '1',
        birth: new Date('2000-01-01'),
        content: '지원 내용 혹은 파일',
        name: '김시험',
        userId: '1',
      },
    };

    const applicantService = new ApplicantService(
      new MockApplicantRepositoryOutboundPort({
        saveJobPostingApplicant: applicant,
      }),
    );

    const param: SaveJobPostingApplicantOutboundPortInputDto = {
      articleId: '1',
      birth: new Date('2000-01-01'),
      content: '지원 내용 혹은 파일',
      name: '김시험',
      userId: '1',
    };

    const res = await applicantService.createJobPostingApplicant(param);

    //진짜 이럴거면 테스트 왜하지?? 뭐지? 뭐가 잘못된걸까?
    expect(res).toStrictEqual(applicant);
  });
});
