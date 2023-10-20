import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { CommonEntity } from '../common/entities/common.entity';
import { CategoryEntity } from '../category/category.entity';
import { UserEntity } from '../user/user.entity';
import { OrderEntity } from '../order/order.entity';
import { TagEntity } from '../tag/tag.entity';

@Entity()
export class JobPostEntity extends CommonEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  budget: number;

  @Column({ default: 0 })
  bids: number;

  @Column({ default: 'open' })
  status: string;

  @Column({ unique: true })
  slug: string;

  @ManyToOne(() => CategoryEntity, (category) => category.jobPost)
  category: Relation<CategoryEntity>;

  @Column()
  categoryId: string;

  @ManyToMany(() => TagEntity)
  @JoinTable()
  tags: Relation<TagEntity>[];

  @ManyToOne(() => UserEntity, (user) => user.jobPosts)
  user: Relation<UserEntity>;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.claimedJobPosts)
  claimedBy: Relation<UserEntity>;

  @Column({ nullable: true })
  claimedById: string;

  @OneToMany(() => OrderEntity, (order) => order.jobPost)
  orders: Relation<OrderEntity>[];

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  ordersCount: number;

  @Column({ default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviewsCount: number;
}
