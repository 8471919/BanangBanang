import { Module } from '@nestjs/common';
import { ArticleController } from 'src/controllers/article.controller';
import { ArticleService } from 'src/services/article.service';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
