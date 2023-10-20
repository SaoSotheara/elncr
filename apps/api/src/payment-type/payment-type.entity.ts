import { Column, Entity } from 'typeorm';

import { CommonEntity } from '../common/entities/common.entity';

@Entity()
export class PaymentTypeEntity extends CommonEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}
