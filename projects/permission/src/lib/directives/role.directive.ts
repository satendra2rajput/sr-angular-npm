import { Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';

import { Role } from '../models/role.model';
import { PermissionService } from '../services/permission.service';

@Directive({
  selector: '[keRole]',
  standalone: true,
})
export class RoleDirective {
  private readonly templateRef = inject(TemplateRef<unknown>);

  private readonly viewContainer = inject(ViewContainerRef);

  private readonly permissionService = inject(PermissionService);

  readonly keRole = input.required<Role | Role[]>();

  constructor() {
    effect(() => {
      this.updateView();
    });
  }

  private updateView(): void {
    this.viewContainer.clear();

    const role = this.keRole();

    const allowed = Array.isArray(role)
      ? this.permissionService.hasAnyRole(role)
      : this.permissionService.hasRole(role);

    if (allowed) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
