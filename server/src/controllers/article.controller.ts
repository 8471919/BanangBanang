import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/guard/logged-in.guard';
import { ApiQueries } from 'src/decorators/api-queries.decorator';
import { Users } from 'src/decorators/user.decorator';
import { GetUserIdDto } from 'src/dtos/auth/get.user-id.dto';
import {
  ArticleControllerInboundPort,
  ARTICLE_CONTROLLER_INBOUNT_PORT,
  CreateArticleInboundPortInputDto,
  ReadArticlesInboundPortInputDto,
  UpdateArticleInboundPortInputDto,
} from 'src/inbound-ports/article/article-controller.inbound-port';

@ApiTags('게시글 API')
@Controller('api/articles')
export class ArticleController {
  constructor(
    @Inject(ARTICLE_CONTROLLER_INBOUNT_PORT)
    private readonly articleControllerInboundPort: ArticleControllerInboundPort,
  ) {}

  @ApiOperation({
    summary: '게시글 작성 api',
    description: 'articleTypeId에 따라 다른 게시글 생성',
  })
  @ApiBody({
    schema: {
      properties: {
        title: { default: 'test title' },
        content: { default: 'test content' },
        userId: { default: '1' },
        articleAreaId: { default: '1' },
        articleTypeId: { default: '1' },
        companyName: { default: 'test company' },
        expirationDate: { default: '2023-12-31T00:00:00.702Z' },
      },
    },
  })
  @ApiCreatedResponse({
    description: '성공 : DB에 게시글을 등록한다.',
  })
  @UseGuards(LoggedInGuard)
  @Post()
  async createArticle(@Body() body: CreateArticleInboundPortInputDto) {
    console.log('create article controller');
    return await this.articleControllerInboundPort.createArticle(body);
  }

  // 게시글을 타입, 지역 별로 가져올 수도 있어야 한다.
  @ApiOperation({
    summary: '게시글 목록 조회 api',
    description:
      '게시글 유형, 지역, 사용자, 정렬 등에 따라 게시글 목록을 조회한다.',
  })
  @ApiQueries(
    [
      { name: 'perPage', description: '페이지 당 게시글 개수' },
      { name: 'currentPage', description: '현재 페이지 번호' },
    ],
    [
      {
        name: 'userId',
        description: '해당 유저 아이디의 게시글 조회시 필요',
      },
      { name: 'articleTypeId', description: '게시글 유형별 조회시 필요' },
      { name: 'articleAreaId', description: '게시글 지역별 조회시 필요' },
      { name: 'order', description: '게시글 정렬 방향' },
      { name: 'type', description: '게시글 정렬 기준' },
    ],
  )
  @Get()
  async readArticles(@Query() query) {
    const params: ReadArticlesInboundPortInputDto = {
      userId: query?.userId,
      articleTypeId: query?.articleTypeId,
      articleAreaId: query?.articleAreaId,
      order: {
        type: query?.type,
        order: query?.order,
      },
      currentPage: query?.currentPage,
      perPage: query?.perPage,
    };

    return await this.articleControllerInboundPort.readArticles(params);
  }

  @ApiOperation({
    summary: '게시글 조회 api',
    description: '게시글 id로 해당 게시글 조회',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '게시글 id',
  })
  @Get(':id')
  async readAnArticle(@Param('id') id: string) {
    return this.articleControllerInboundPort.readAnArticle({ articleId: id });
  }

  @ApiOperation({
    summary: '게시글 수정 api',
    description: '게시글 id로 해당 게시글 수정',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '게시글 id',
  })
  @ApiBody({
    schema: {
      properties: {
        title: { default: 'update title' },
        content: { default: 'update content' },
        articleAreaId: { default: '1' },
        articleTypeId: { default: '1' },
        companyName: {
          default: 'update company Name',
          description: 'optional',
        },
        expirationDate: { default: '2023-12-12', description: 'optional' },
      },
    },
  })
  @UseGuards(LoggedInGuard)
  @Put(':id')
  async updateArticle(
    @Param('id') articleId: string,
    @Body()
    body: Omit<UpdateArticleInboundPortInputDto, 'articleId' | 'userId'>,
    @Users() user: GetUserIdDto,
  ) {
    return this.articleControllerInboundPort.updateArticle({
      userId: user.id,
      ...body,
      articleId: articleId,
    });
  }
}
