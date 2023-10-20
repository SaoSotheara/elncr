import type { Type } from '@nestjs/common';
import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const ApiResource = (
  entityClassOrName: Type | string,
  version = 'v1'
) => {
  const resourceName =
    typeof entityClassOrName === 'string'
      ? entityClassOrName
      : entityClassOrName.name;
  const nameWithoutEntitySuffix = resourceName.replace('Entity', '');

  return applyDecorators(
    ApiTags('🚀 ' + nameWithoutEntitySuffix),
    Controller(`${version}/${nameWithoutEntitySuffix.toLowerCase()}`)
  );
};
