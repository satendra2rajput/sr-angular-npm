import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EventEmitter,
  inject,
  Input,
  Output,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { KeModalConfig } from '../../models/modal-config';

@Component({
  selector: 'ke-modal',
  imports: [],
  templateUrl: './ke-modal.html',
  styleUrl: './ke-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeModal {
  private readonly viewContainerRef = inject(ViewContainerRef);

  @Input() config: KeModalConfig = {};

  @Output() closed = new EventEmitter<void>();

  private dynamicComponentRef?: ComponentRef<unknown>;

  loadComponent<T>(component: Type<T>): ComponentRef<T> {
    this.viewContainerRef.clear();

    this.dynamicComponentRef = this.viewContainerRef.createComponent(component);

    return this.dynamicComponentRef as ComponentRef<T>;
  }

  close(): void {
    if (this.config.preventClose) {
      return;
    }

    this.closed.emit();
  }

  onBackdropClick(): void {
    if (this.config.closeOnBackdrop !== false) {
      this.close();
    }
  }

  destroyDynamicComponent(): void {
    this.dynamicComponentRef?.destroy();
    this.dynamicComponentRef = undefined;
  }
}
