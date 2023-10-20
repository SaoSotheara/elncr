import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import type { Request } from 'express';
import { UserService } from '../user/user.service';
import type { PermissionMetadataValue } from './decorators/required-permission.decorator';
import { PERMISSION_KEY } from './auth.keys';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const permissionAction = this.reflector.get<PermissionMetadataValue>(
      PERMISSION_KEY,
      context.getHandler()
    );
    if (!permissionAction) {
      return true;
    }
    const {
      currentSession: { user },
    } = context.switchToHttp().getRequest<Request>();
    return this.userService.hasPermission(user, permissionAction);
  }
}
