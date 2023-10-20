import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  RelationId,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { EntityState } from '../enums/entity-state.enum';
import type { UserEntity } from '../../user/user.entity';

export class CommonWithoutIdEntity {
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt: Date;

  @Column({ unique: false, nullable: true })
  @RelationId((entity: CommonEntity) => entity.createdBy)
  createdByUserId?: string;

  @Column({ unique: false, nullable: true })
  @RelationId((entity: CommonEntity) => entity.updatedBy)
  updatedByUserId?: string;

  @ManyToOne('UserEntity', { nullable: true })
  @JoinColumn({ name: 'created_by_user_id', referencedColumnName: 'id' })
  createdBy?: Relation<UserEntity>;

  @ManyToOne('UserEntity', { nullable: true })
  @JoinColumn({ name: 'updated_by_user_id', referencedColumnName: 'id' })
  updatedBy?: Relation<UserEntity>;

  @Column({
    type: 'enum',
    enumName: 'entity_state_enum',
    enum: EntityState,
    default: EntityState.ACTIVE,
  })
  state: EntityState;

  @Exclude({ toPlainOnly: true })
  @VersionColumn()
  version: number;
}

export abstract class CommonEntity extends CommonWithoutIdEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
