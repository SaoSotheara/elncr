import { Relation } from 'typeorm';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { CommonWithoutIdEntity } from '../common/entities/common.entity';
import { RoleEntity } from '../role/role.entity';
import { SessionEntity } from '../session/session.entity';
import { UploadEntity } from '../upload/upload.entity';
import { JobPostEntity } from '../job-post/job-post.entity';
import { OrderEntity } from '../order/order.entity';
import { MessageEntity } from '../message/message.entity';
import { ServiceEntity } from '../service/service.entity';
import { ReviewEntity } from '../review/review.entity';
import { CompanyEntity } from '../company/company.entity';
import { JobCandidateEntity } from '../job-candidate/job-candidate.entity';

@Entity()
export class UserEntity extends CommonWithoutIdEntity {
  @PrimaryColumn({ type: 'varchar', comment: 'match with firebase uid' })
  id: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  profileImageUrl?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column()
  email: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  birthDate?: string;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Relation<RoleEntity>[];

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions?: Relation<SessionEntity>[];

  @OneToMany(() => ServiceEntity, (service) => service.user)
  services: ServiceEntity[];

  @OneToMany(() => UploadEntity, (uploads) => uploads.user)
  uploads: Relation<UploadEntity>[];

  @OneToMany(() => ReviewEntity, (review) => review.ratedBy)
  reviews: ReviewEntity[];

  @OneToMany(() => JobPostEntity, (jobPost) => jobPost.user)
  jobPosts: JobPostEntity[];

  @OneToMany(() => JobPostEntity, (jobPost) => jobPost.claimedBy)
  claimedJobPosts: JobPostEntity[];

  @OneToMany(() => OrderEntity, (order) => order.freelancer)
  ordersReceived: OrderEntity[];

  @OneToMany(() => OrderEntity, (order) => order.client)
  ordersCreated: OrderEntity[];

  @OneToMany(() => MessageEntity, (message) => message.author)
  messages: MessageEntity[];

  @OneToOne(() => CompanyEntity, (company) => company.user)
  company: Relation<CompanyEntity>;

  @OneToMany(
    () => JobCandidateEntity,
    (jobCandidate: JobCandidateEntity) => jobCandidate.user
  )
  appliedJobs?: Relation<JobCandidateEntity>[];
}
