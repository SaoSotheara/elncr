import { Column, Entity, ManyToOne, Relation, RelationId } from 'typeorm';
import { CommonEntity } from '../common/entities/common.entity';
import { UserEntity } from '../user/user.entity';
import { JobEntity } from '../job/job.entity';

@Entity()
export class JobCandidateEntity extends CommonEntity {
  @Column()
  @RelationId((entity: JobCandidateEntity) => entity.user)
  userId: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.appliedJobs)
  user: Relation<UserEntity>;

  @Column()
  @RelationId((entity: JobCandidateEntity) => entity.job)
  jobId: string;

  @ManyToOne(() => JobEntity, (job: JobEntity) => job.candidates)
  job: Relation<JobEntity>;

  @Column()
  cvFileUrl: string;

  @Column({ nullable: true })
  coverLetterFileUrl?: string;

  @Column({ nullable: true })
  message?: string;
}
