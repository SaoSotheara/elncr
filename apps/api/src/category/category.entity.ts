import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../common/entities/common.entity';
import { ServiceEntity } from '../service/service.entity';
import { JobPostEntity } from '../job-post/job-post.entity';

@Entity()
export class CategoryEntity extends CommonEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => ServiceEntity, (service) => service.category)
  services: ServiceEntity[];

  @OneToMany(() => JobPostEntity, (jobPost) => jobPost.category)
  jobPost: JobPostEntity[];
}
