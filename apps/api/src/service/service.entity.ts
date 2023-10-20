import { Relation } from 'typeorm';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CommonEntity } from '../common/entities/common.entity';
import { CategoryEntity } from '../category/category.entity';
import { UserEntity } from '../user/user.entity';
import { TagEntity } from '../tag/tag.entity';
import { PackageEntity } from '../package/package.entity';
import { OrderEntity } from '../order/order.entity';
import { FeatureEntity } from '../feature/feature.entity';
import { ReviewEntity } from '../review/review.entity';

@Entity()
export class ServiceEntity extends CommonEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ unique: true })
  slug: string;

  @ManyToOne(() => CategoryEntity, (category) => category.services)
  category: Relation<CategoryEntity>;

  @Column()
  categoryId: string;

  @Column('text', { array: true })
  images: string[];

  @ManyToMany(() => TagEntity)
  @JoinTable()
  tags: Relation<TagEntity>[];

  @OneToMany(() => PackageEntity, (packageEntity) => packageEntity.service)
  package: Relation<PackageEntity>[];

  @OneToMany(() => FeatureEntity, (featureEntity) => featureEntity.service)
  feature: Relation<FeatureEntity>[];

  @ManyToOne(() => UserEntity, (user) => user.services)
  user: Relation<UserEntity>;

  @Column()
  userId: string;

  @OneToMany(() => OrderEntity, (order) => order.service)
  orders: Relation<OrderEntity>[];

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  ordersCount: number;

  @Column({ default: 0 })
  rating: number;

  @OneToMany(() => ReviewEntity, (review) => review.service)
  reviews: Relation<ReviewEntity>[];

  @Column({ default: 0 })
  reviewsCount: number;
}
