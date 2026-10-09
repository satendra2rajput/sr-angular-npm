import { Pipe, PipeTransform, inject } from '@angular/core';

import { Permission } from '../models/permission.model';
import { PermissionService } from '../services/permission.service';

@Pipe({
  name: 'kePermission',
  standalone: true,
})
export class PermissionPipe implements PipeTransform {
  private readonly permissionService = inject(PermissionService);

  transform(permission: Permission | Permission[]): boolean {
    if (Array.isArray(permission)) {
      return this.permissionService.hasAny(permission);
    }

    return this.permissionService.has(permission);
  }
}
