import { Column, Entity, ManyToMany } from 'typeorm';

import { CommonEntity } from '../common/entities/common.entity';
import { JobEntity } from '../job/job.entity';

@Entity()
export class TagEntity extends CommonEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ unique: true })
  slug: string;

  @ManyToMany(() => JobEntity, (job) => job.tags)
  jobs: JobEntity;
}
