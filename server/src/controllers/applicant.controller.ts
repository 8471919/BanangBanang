import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/guard/logged-in.guard';
import { Users } from 'src/decorators/user.decorator';
import { GetUserIdDto } from 'src/dtos/auth/get.user-id.dto';
import {
  ApplicantControllerInboundPort,
  APPLICANT_CONTROLLER_INBOUND_PORT,
  CreateJobPostingApplicantInboundPortInputDto,
} from 'src/inbound-ports/applicant/applicant-controller.inbound-port';

@Controller('api/applicants')
export class ApplicantController {
  constructor(
    @Inject(APPLICANT_CONTROLLER_INBOUND_PORT)
    private readonly applicantControllerInbountPort: ApplicantControllerInboundPort,
  ) {}

  @ApiOperation({
    summary: '공고 지원 API',
    description: '게시글 id에 해당하는 공고에 해당하는 지원자 데이터 생성',
  })
  @ApiBody({
    schema: {
      properties: {
        articleId: { default: 2 },
        birth: { default: '2000-01-01' },
        content: { default: '지원 내용' },
        name: { default: '김비빔' },
      },
    },
  })
  @UseGuards(LoggedInGuard)
  @Post()
  async createJobPostingApplicant(
    @Users() user: GetUserIdDto,
    @Body() body: CreateJobPostingApplicantInboundPortInputDto,
  ) {
    await this.applicantControllerInbountPort.createJobPostingApplicant({
      articleId: body.articleId,
      birth: body.birth,
      content: body.content,
      name: body.name,
      userId: user.id,
    });
  }
}
