import type { QueryRunner } from 'typeorm';

import { generatePermissionsForEntity } from '../common/utils/permission.utils';
import { UserEntity } from './user.entity';
import { DEFAULT_SUPER_ADMIN_ROLE_NAME } from '../role/role.constant';
import { RoleEntity } from '../role/role.entity';

export const insertInitialUser = async (queryRunner: QueryRunner) => {
  const permissionsForUserResource = generatePermissionsForEntity(
    queryRunner,
    UserEntity
  );
  const permissionsForRoleResource = generatePermissionsForEntity(
    queryRunner,
    RoleEntity
  );

  const permissions = await queryRunner.manager.save([
    ...permissionsForUserResource,
    ...permissionsForRoleResource,
  ]);

  // filter only manage:* permissions
  const managePermissions = permissions.filter((permission) =>
    permission.actionResource.startsWith('manage:')
  );

  const role = await queryRunner.manager.save(
    queryRunner.manager.create(RoleEntity, {
      isSystem: true,
      name: DEFAULT_SUPER_ADMIN_ROLE_NAME,
      permissions: managePermissions,
    })
  );

  await queryRunner.manager.save(
    queryRunner.manager.create(UserEntity, {
      roles: [role],
    })
  );
};

export const findDefaultSuperAdminRoleOrThrow = async (
  queryRunner: QueryRunner
): Promise<RoleEntity> => {
  const role = await queryRunner.manager.findOne(RoleEntity, {
    where: {
      name: DEFAULT_SUPER_ADMIN_ROLE_NAME,
    },
    relations: ['permissions'],
  });
  if (!role) {
    throw new Error(`Role ${DEFAULT_SUPER_ADMIN_ROLE_NAME} not found`);
  }
  return role;
};
