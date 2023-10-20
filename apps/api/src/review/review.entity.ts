import { CommonEntity } from '../common/entities/common.entity';
import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ServiceEntity } from '../service/service.entity';

@Entity()
export class ReviewEntity extends CommonEntity {
  @Column()
  rating: number;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  ratedBy: Relation<UserEntity>;

  @Column()
  ratedById: string;

  @ManyToOne(() => ServiceEntity, (service) => service.reviews)
  service: Relation<ServiceEntity>;

  @Column()
  serviceId: string;
}
