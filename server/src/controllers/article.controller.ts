import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ArticleControllerInboundPort,
  ARTICLE_CONTROLLER_INBOUNT_PORT,
  CreateArticleInboundPortInputDto,
} from 'src/inbound-ports/article/article-controller.inbound-port';

@Controller('api/articles')
export class ArticleController {
  constructor(
    @Inject(ARTICLE_CONTROLLER_INBOUNT_PORT)
    private readonly articleControllerInboundPort: ArticleControllerInboundPort,
  ) {}

  @Post()
  async createArticle(@Body() body: CreateArticleInboundPortInputDto) {
    console.log('create article controller');
    return await this.articleControllerInboundPort.createArticle(body);
  }
}
