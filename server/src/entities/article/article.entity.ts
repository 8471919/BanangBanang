import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CommentEntity } from '../comment/comment.entity';
import { CommonBigPKEntity } from '../common/common.entity';
import { UserEntity } from '../user/user.entity';
import { ArticleAreaEntity } from './article-area.entity';
import { ArticleTypeEntity } from './article-type.entity';
import { ApplicantEntity } from '../applicant/applicant.entity';
import { JobPostingExtendArticleEntity } from './job-posting-extend-article.entity';

@Entity('ARTICLE')
export class ArticleEntity extends CommonBigPKEntity {
  @Column('varchar', { unique: false, nullable: false })
  title: string;

  @Column('text', { unique: false, nullable: false })
  content: string;

  @Column('bigint', { unique: false, nullable: false })
  userId: string;

  @Column('int', { unique: false, nullable: false })
  articleAreaId: number;

  @Column('int', { unique: false, nullable: false })
  articleTypeId: number;

  @ManyToOne(() => UserEntity, (user) => user.articles)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => ArticleAreaEntity, (articleArea) => articleArea.articles)
  @JoinColumn({ name: 'articleAreaId', referencedColumnName: 'id' })
  articleArea: ArticleAreaEntity;

  @ManyToOne(() => ArticleTypeEntity, (articleType) => articleType.articles)
  @JoinColumn({ name: 'articleTypeId', referencedColumnName: 'id' })
  articleType: ArticleTypeEntity;

  @OneToMany(() => CommentEntity, (comments) => comments.article)
  comments: CommentEntity[];

  @OneToOne(
    () => JobPostingExtendArticleEntity,
    (jobPosting) => jobPosting.article,
    { cascade: true },
  )
  jobPosting: JobPostingExtendArticleEntity;

  @OneToMany(() => ApplicantEntity, (applicant) => applicant.article)
  jobApplicants: ApplicantEntity[];
}
