import type { Relation } from 'typeorm';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { CommonEntity } from '../common/entities/common.entity';
import { UserEntity } from '../user/user.entity';
import { PermissionEntity } from '../permission/permission.entity';

@Entity()
export class RoleEntity extends CommonEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false, comment: `system role can't be deleted` })
  isSystem: boolean;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: Relation<UserEntity>[];

  @Column({ default: false })
  isDefaultUserRegistration: boolean;

  @ManyToMany(() => PermissionEntity, (permission) => permission.roles)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Relation<PermissionEntity>[];
}
