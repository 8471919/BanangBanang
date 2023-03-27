import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicantEntity } from './applicant.entity';

@Entity('APPLICANT_TYPE')
export class ApplicantTypeEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { unique: true, nullable: false })
  type: string;

  @OneToMany(() => ApplicantEntity, (applicant) => applicant.applicantType)
  applicants: ApplicantEntity[];
}
