import { Column, Entity } from 'typeorm';
import { CommonBigPKEntity } from '../common/common.entity';

@Entity('JOB_POSTING_APPLICANT')
export class JobPostingApplicantEntity extends CommonBigPKEntity {
  @Column('bigint', { unique: false, nullable: false })
  articleId: string;

  @Column('varchar', { unique: false, nullable: false })
  name: string;

  @Column('timestamp', { unique: false, nullable: false })
  birth: Date;

  @Column('text', { unique: false, nullable: false })
  content: string;
}
