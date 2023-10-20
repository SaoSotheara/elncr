import { Column, Entity, JoinColumn, OneToOne, Relation } from 'typeorm';

import { CommonEntity } from '../common/entities/common.entity';
import { UserEntity } from '../user/user.entity';

@Entity()
export class CompanyEntity extends CommonEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  description: string;

  @OneToOne(() => UserEntity, (user) => user.company)
  @JoinColumn()
  user: Relation<UserEntity>;

  @Column({ nullable: true })
  image: string;

  @Column()
  address: string;
}
