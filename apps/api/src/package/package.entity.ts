import { CommonEntity } from '../common/entities/common.entity';
import { Column, Entity, ManyToOne, OneToMany, Relation } from 'typeorm';
import { ServiceEntity } from '../service/service.entity';
import { OrderEntity } from '../order/order.entity';

@Entity()
export class PackageEntity extends CommonEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  serviceId: string;

  @ManyToOne(() => ServiceEntity, (service) => service.package)
  service: Relation<ServiceEntity>;

  @OneToMany(() => OrderEntity, (order) => order.package)
  orders: Relation<OrderEntity>[];
}
