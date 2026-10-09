import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';

import { PermissionService } from '../services/permission.service';
import { Permission } from '../models/permission.model';
import { Role } from '../models/role.model';

export const permissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const permissionService = inject(PermissionService);

  const router = inject(Router);

  const permissions = route.data['permissions'] as Permission[] | undefined;

  const roles = route.data['roles'] as Role[] | undefined;

  const requireAll = route.data['requireAll'] ?? false;

  if (permissions?.length) {
    const allowed = requireAll
      ? permissionService.hasAll(permissions)
      : permissionService.hasAny(permissions);

    if (!allowed) {
      return router.createUrlTree(['/forbidden']);
    }
  }

  if (roles?.length) {
    const allowed = requireAll
      ? permissionService.hasAllRoles(roles)
      : permissionService.hasAnyRole(roles);

    if (!allowed) {
      return router.createUrlTree(['/forbidden']);
    }
  }

  return true;
};
