import { SetMetadata } from '@nestjs/common';
import { PermissionsEnum } from 'src/app/permissions/entities/permission.entity';

export const Permissions = (...permissions: PermissionsEnum[]) =>
  SetMetadata('permissions', permissions);
