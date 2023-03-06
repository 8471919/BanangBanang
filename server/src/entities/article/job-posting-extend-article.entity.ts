import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CommonBigPKEntity } from '../common/common.entity';
import { ArticleEntity } from './article.entity';

@Entity('JOB_POSTING_EXTEND_ARTICLE')
export class JobPostingExtendArticleEntity extends CommonBigPKEntity {
  @Column('varchar', { unique: false, nullable: false })
  companyName: string;

  @Column('timestamp', { unique: false, nullable: false })
  expiration_date: Date;

  @Column('bigint', { unique: true, nullable: false })
  articleId: string;

  @OneToOne(() => ArticleEntity, (article) => article.jobPosting)
  @JoinColumn({ name: 'articleId', referencedColumnName: 'id' })
  article: ArticleEntity;
}
