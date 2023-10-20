import type { Type } from '@nestjs/common';

import type { QueryRunner } from 'typeorm';

import { findDefaultSuperAdminRoleOrThrow } from '../../user/user.utils';

import { generatePermissionsForEntity } from './permission.utils';

export const PermissionSeed = async (
  queryRunner: QueryRunner,
  entity: string | Type
) => {
  const permissionsForEntityResource = generatePermissionsForEntity(
    queryRunner,
    entity
  );
  const permissions = await queryRunner.manager.save(
    permissionsForEntityResource
  );
  const manageEntityPermissions = permissions.filter((permission) =>
    permission.actionResource.startsWith('manage:')
  );

  const role = await findDefaultSuperAdminRoleOrThrow(queryRunner);
  role.permissions = [...role.permissions, ...manageEntityPermissions];
  await queryRunner.manager.save(role);
};

export const RollbackPermissionSeed = async (
  queryRunner: QueryRunner,
  entity: string | Type
) => {
  const permissionsForEntityResource = generatePermissionsForEntity(
    queryRunner,
    entity
  );
  const permissions = await queryRunner.manager.save(
    permissionsForEntityResource
  );
  const manageEntityPermissions = permissions.filter((permission) =>
    permission.actionResource.startsWith('manage:')
  );
  const role = await findDefaultSuperAdminRoleOrThrow(queryRunner);
  role.permissions = role.permissions.filter(
    (permission) =>
      !manageEntityPermissions.includes(permission) &&
      !permission.actionResource.startsWith('manage:')
  );
  await queryRunner.manager.save(role);
};
