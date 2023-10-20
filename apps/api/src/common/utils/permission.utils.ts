import type { Type } from '@nestjs/common';

import type { QueryRunner } from 'typeorm';

import { getResourceName } from '../../auth/decorators/required-permission.decorator';
import { PermissionEntity } from '../../permission/permission.entity';
import { CrudActions } from '@open-lens/nestjs-crud';

enum ManageAction {
  MANAGE = 'manage',
}

const Actions = {
  ...CrudActions,
  ...ManageAction,
};

export const getPermissionActionResource = (
  action: CrudActions,
  resource: string | Type
) => {
  return `${action}:${getResourceName(resource)}`;
};

export const generatePermissionsForEntity = (
  queryRunner: QueryRunner,
  entity: string | Type,
  seedRecover = false,
  permissions?: CrudActions[]
) => {
  if (permissions) {
    return permissions.map((action) => {
      const actionResource = getPermissionActionResource(action, entity);
      return queryRunner.manager.create(PermissionEntity, {
        actionResource,
      });
    });
  }
  const permissionsToSeed = [];
  for (const action of Object.keys(Actions)) {
    if (!seedRecover && action === 'RECOVER_ONE') {
      continue;
    }
    const actionResource = getPermissionActionResource(Actions[action], entity);
    permissionsToSeed.push(
      queryRunner.manager.create(PermissionEntity, {
        actionResource,
      })
    );
  }
  return permissionsToSeed;
};
