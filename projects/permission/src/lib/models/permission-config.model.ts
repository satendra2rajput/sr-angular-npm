import { Permission } from './permission.model';
import { Role } from './role.model';

export interface PermissionConfig {
  permissions?: Permission[];
  roles?: Role[];
}
