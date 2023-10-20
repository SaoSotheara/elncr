import { Column, Entity } from 'typeorm';

import { CommonEntity } from '../common/entities/common.entity';

@Entity()
export class JobTypeEntity extends CommonEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  description: string;
}
