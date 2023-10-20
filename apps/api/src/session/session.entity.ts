import {
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  Relation,
} from 'typeorm';

import { CommonEntity } from '../common/entities/common.entity';
import { UserEntity } from '../user/user.entity';

@Entity()
export class SessionEntity extends CommonEntity {
  @Column()
  accessToken: string;

  @Column({ default: 0 })
  apiInvocationCount: number;

  @Column({ type: 'timestamptz', nullable: true })
  lastAccessAt: Date;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'created_by_user_id',
  })
  user: Relation<UserEntity>;
  @BeforeUpdate()
  increaseApiInvocation() {
    this.apiInvocationCount++;
  }
}
