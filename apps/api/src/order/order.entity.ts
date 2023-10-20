import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Relation,
} from 'typeorm';
import { CommonEntity } from '../common/entities/common.entity';
import { UserEntity } from '../user/user.entity';
import { PackageEntity } from '../package/package.entity';
import { ServiceEntity } from '../service/service.entity';
import { JobPostEntity } from '../job-post/job-post.entity';
import { FeatureEntity } from '../feature/feature.entity';

@Entity()
export class OrderEntity extends CommonEntity {
  @Column()
  type: string;

  @Column()
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.ordersCreated)
  client: Relation<UserEntity>;

  @Column()
  clientId: string;

  @ManyToOne(() => UserEntity, (user) => user.ordersReceived)
  freelancer: Relation<UserEntity>;

  @Column()
  freelancerId: string;

  @ManyToOne(() => JobPostEntity, (jobPost) => jobPost.orders)
  jobPost: Relation<JobPostEntity>;

  @Column({ nullable: true })
  jobPostId: string;

  @ManyToOne(() => ServiceEntity, (service) => service.orders)
  service: Relation<ServiceEntity>;

  @Column({ nullable: true })
  serviceId: string;

  @ManyToOne(() => PackageEntity, (packageEntity) => packageEntity.orders)
  package: Relation<PackageEntity>;

  @Column({ nullable: true })
  packageId: string;

  @ManyToMany(() => FeatureEntity)
  @JoinTable()
  features: Relation<FeatureEntity>[];

  @Column({ default: '' })
  instruction: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  deliveryDays: number;
}
