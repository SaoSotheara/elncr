import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  Relation,
} from 'typeorm';

import { CommonEntity } from '../common/entities/common.entity';
import { UserEntity } from '../user/user.entity';
import { TagEntity } from '../tag/tag.entity';
import { LevelEntity } from '../level/level.entity';
import { JobTypeEntity } from '../job-type/job-type.entity';
import { CurrencyEntity } from '../currency/currency.entity';
import { PaymentTypeEntity } from '../payment-type/payment-type.entity';
import { LocationEntity } from '../location/location.entity';
import { JobCandidateEntity } from '../job-candidate/job-candidate.entity';

@Entity()
export class JobEntity extends CommonEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  howToApply: string;

  @Column({ type: 'numeric' })
  maxSalary: number;

  @Column({ type: 'numeric' })
  minSalary: number;

  @Column()
  isRemote: boolean;

  @Column({ name: 'application_target' })
  applicationTarget: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: Relation<UserEntity>;

  @ManyToOne(() => LevelEntity)
  @JoinColumn()
  level: Relation<LevelEntity>;

  @ManyToOne(() => JobTypeEntity)
  @JoinColumn()
  jobType: Relation<JobTypeEntity>;

  @OneToOne(() => CurrencyEntity)
  @JoinColumn()
  currency: Relation<CurrencyEntity>;

  @OneToOne(() => LocationEntity)
  @JoinColumn()
  location: Relation<LocationEntity>;

  @OneToOne(() => PaymentTypeEntity)
  @JoinColumn()
  paymentType: Relation<PaymentTypeEntity>;

  @ManyToMany(() => TagEntity, (tags) => tags.jobs)
  @JoinTable({
    name: 'job_tags',
    joinColumn: { name: 'job_id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  tags: Relation<TagEntity>[];

  @OneToMany(
    () => JobCandidateEntity,
    (jobCandidateEntity: JobCandidateEntity) => jobCandidateEntity.job
  )
  candidates?: Relation<JobCandidateEntity>[];
}
