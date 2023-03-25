import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonBigPKEntity } from '../common/common.entity';
import { UserEntity } from '../user/user.entity';
import { ArticleEntity } from '../article/article.entity';
import { ApplicantTypeEntity } from './applicant-type.entity';

@Entity('APPLICANT')
export class ApplicantEntity extends CommonBigPKEntity {
  @Column('bigint', { unique: false, nullable: false })
  articleId: string;

  @Column('varchar', { unique: false, nullable: false })
  name: string;

  @Column('timestamp', { unique: false, nullable: false })
  birth: Date;

  @Column('text', { unique: false, nullable: false })
  content: string;

  @Column('bigint', { unique: false, nullable: false })
  userId: string;

  @Column('int', { unique: false, nullable: false })
  applicantTypeId: number;

  @ManyToOne(() => ArticleEntity, (article) => article.jobApplicants)
  @JoinColumn({ name: 'articleId', referencedColumnName: 'id' })
  article: ArticleEntity;

  @ManyToOne(() => UserEntity, (user) => user.jobApplicants)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(
    () => ApplicantTypeEntity,
    (applicantType) => applicantType.applicants,
  )
  @JoinColumn({ name: 'applicantTypeId', referencedColumnName: 'id' })
  applicantType: ApplicantTypeEntity;
}
