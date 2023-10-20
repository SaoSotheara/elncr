import type { Type } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

import { snakeCase } from 'typeorm/util/StringUtils';
import { PERMISSION_KEY } from '../auth.keys';
import type { CrudActions } from '@open-lens/nestjs-crud';

export interface PermissionMetadataValue {
  action: CrudActions;
  resource: string;
}

export const getResourceName = (resource: Type | string): string => {
  const resourceName = typeof resource === 'string' ? resource : resource.name;
  return snakeCase(resourceName);
};

export const RequiredPermission = (
  action: CrudActions,
  resource: Type | string
) => {
  const values: PermissionMetadataValue = {
    resource: getResourceName(resource),
    action,
  };
  return SetMetadata(PERMISSION_KEY, values);
};
