// src/common/guards/permissions.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
import { PermissionsEnum } from 'src/app/permissions/entities/permission.entity';
import { UserService } from 'src/app/user/user.service';
  
  @Injectable()
  export class PermissionsGuard implements CanActivate {
    constructor(
      private reflector: Reflector,
      private userService: UserService
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const requiredPermissions = this.reflector.get<PermissionsEnum[]>(
        'permissions',
        context.getHandler()
      );
  
      if (!requiredPermissions || requiredPermissions.length === 0) return true; // No permissions required
  
      const request = context.switchToHttp().getRequest();
      const user = request.sub; // User is already attached by AuthMiddleware
  
      if (!user) {
        throw new ForbiddenException('User not found in request');
      }
  
      const hasPermission = await this.hasAnyPermission(user.username, requiredPermissions);
  
      if (!hasPermission) {
        throw new ForbiddenException('You do not have the required permissions');
      }
  
      return true;
    }
  
    private async hasAnyPermission(
      username: string,
      permissions: PermissionsEnum[]
    ): Promise<boolean> {
      for (const permission of permissions) {
        const hasPermission = await this.userService.hasPermission(username, permission);
        if (hasPermission) return true;
      }
      return false;
    }
  }
  