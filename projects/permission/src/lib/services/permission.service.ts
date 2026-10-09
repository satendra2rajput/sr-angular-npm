import { Injectable, computed, signal } from '@angular/core';

import { Permission } from '../models/permission.model';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private readonly permissions = signal<Permission[]>([]);
  private readonly roles = signal<Role[]>([]);

  readonly permissions$ = this.permissions.asReadonly();
  readonly roles$ = this.roles.asReadonly();

  readonly isAuthenticated = computed(
    () => this.permissions().length > 0 || this.roles().length > 0,
  );

  setPermissions(permissions: Permission[]): void {
    this.permissions.set([...permissions]);
  }

  setRoles(roles: Role[]): void {
    this.roles.set([...roles]);
  }

  addPermission(permission: Permission): void {
    if (!this.has(permission)) {
      this.permissions.update((current) => [...current, permission]);
    }
  }

  removePermission(permission: Permission): void {
    this.permissions.update((current) => current.filter((item) => item !== permission));
  }

  addRole(role: Role): void {
    if (!this.hasRole(role)) {
      this.roles.update((current) => [...current, role]);
    }
  }

  removeRole(role: Role): void {
    this.roles.update((current) => current.filter((item) => item !== role));
  }

  has(permission: Permission): boolean {
    return this.permissions().includes(permission);
  }

  hasAny(permissions: Permission[]): boolean {
    return permissions.some((permission) => this.has(permission));
  }

  hasAll(permissions: Permission[]): boolean {
    return permissions.every((permission) => this.has(permission));
  }

  hasRole(role: Role): boolean {
    return this.roles().includes(role);
  }

  hasAnyRole(roles: Role[]): boolean {
    return roles.some((role) => this.hasRole(role));
  }

  hasAllRoles(roles: Role[]): boolean {
    return roles.every((role) => this.hasRole(role));
  }

  clearPermissions(): void {
    this.permissions.set([]);
  }

  clearRoles(): void {
    this.roles.set([]);
  }

  clear(): void {
    this.permissions.set([]);
    this.roles.set([]);
  }
}
