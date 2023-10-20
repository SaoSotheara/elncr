import type { Relation } from 'typeorm';
import { Column, Entity, ManyToMany } from 'typeorm';
import { CommonEntity } from '../common/entities/common.entity';
import { RoleEntity } from '../role/role.entity';

@Entity()
export class PermissionEntity extends CommonEntity {
  @Column({ unique: true })
  actionResource: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: Relation<RoleEntity>[];
}
