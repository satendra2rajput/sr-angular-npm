import { Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';

import { Permission } from '../models/permission.model';
import { PermissionService } from '../services/permission.service';

@Directive({
  selector: '[kePermission]',
  standalone: true,
})
export class PermissionDirective {
  private readonly templateRef = inject(TemplateRef<unknown>);

  private readonly viewContainer = inject(ViewContainerRef);

  private readonly permissionService = inject(PermissionService);

  readonly kePermission = input.required<Permission | Permission[]>();

  constructor() {
    effect(() => {
      this.updateView();
    });
  }

  private updateView(): void {
    this.viewContainer.clear();

    const permission = this.kePermission();

    const allowed = Array.isArray(permission)
      ? this.permissionService.hasAny(permission)
      : this.permissionService.has(permission);

    if (allowed) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
