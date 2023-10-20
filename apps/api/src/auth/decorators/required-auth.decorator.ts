import type { Type } from '@nestjs/common';
import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PermissionGuard } from '../permission.guard';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { AuditorInterceptor } from '../../common/interceptors/auditor.interceptor';
import { RequiredPermission } from './required-permission.decorator';
import type { CrudActions } from '@open-lens/nestjs-crud';

/**
 * Decorator to apply authentication and authorization guards to a controller or route handler.
 * pass both action and resource to apply RequiredPermission.
 */
export const RequiredAuth = (
  action?: CrudActions,
  resource?: Type | string
) => {
  const decorators = [
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, PermissionGuard),
    UseInterceptors(AuditorInterceptor),
  ];

  if (action && !resource) {
    throw new Error(
      'You must provide a resource when you provide an action to RequiredAuth decorator.'
    );
  } else if (!action && resource) {
    throw new Error(
      'You must provide an action when you provide a resource to RequiredAuth decorator.'
    );
  }

  if (action && resource) {
    decorators.push(RequiredPermission(action, resource));
  }
  return applyDecorators(...decorators);
};
