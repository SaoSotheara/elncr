import { Column, Entity, ManyToOne, OneToMany, Relation } from 'typeorm';
import { CommonEntity } from '../common/entities/common.entity';
import { ServiceEntity } from '../service/service.entity';
import { OrderEntity } from '../order/order.entity';

@Entity()
export class FeatureEntity extends CommonEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  included: boolean;

  @Column()
  serviceId: string;

  @ManyToOne(() => ServiceEntity, (service) => service.feature)
  service: Relation<ServiceEntity>;

  @OneToMany(() => OrderEntity, (order) => order.features)
  orders: Relation<OrderEntity>[];
}
