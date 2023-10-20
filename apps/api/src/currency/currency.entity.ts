import { Column, Entity } from 'typeorm';

import { CommonEntity } from '../common/entities/common.entity';

@Entity()
export class CurrencyEntity extends CommonEntity {
  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column()
  isoCode: string;
}
