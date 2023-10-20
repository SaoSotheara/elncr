import { Column, Entity } from 'typeorm';

import { CommonEntity } from '../common/entities/common.entity';

@Entity()
export class LocationEntity extends CommonEntity {
  @Column()
  name: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;
}
