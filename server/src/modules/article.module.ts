import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from 'src/controllers/article.controller';
import { ArticleEntity } from 'src/entities/article/article.entity';
import { ARTICLE_CONTROLLER_INBOUNT_PORT } from 'src/inbound-ports/article/article-controller.inbound-port';
import { ARTICLE_REPOSITORY_OUTBOUND_PORT } from 'src/outbound-ports/article/article-repository.outbound-port';
import { ArticleRepository } from 'src/repositories/article.repository';
import { ArticleService } from 'src/services/article.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  controllers: [ArticleController],
  providers: [
    {
      provide: ARTICLE_CONTROLLER_INBOUNT_PORT,
      useClass: ArticleService,
    },
    {
      provide: ARTICLE_REPOSITORY_OUTBOUND_PORT,
      useClass: ArticleRepository,
    },
    ArticleService,
  ],
})
export class ArticleModule {}
