import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  Type,
  createComponent,
} from '@angular/core';

import { KeModal } from '../components/ke-modal/ke-modal';
import { KeModalConfig } from '../models/modal-config';
import { KeModalRef } from '../models/modal-ref';

@Injectable({
  providedIn: 'root',
})
export class KeModalService {
  private modalRef?: ComponentRef<KeModal>;

  constructor(
    private readonly appRef: ApplicationRef,
    private readonly environmentInjector: EnvironmentInjector,
  ) {}

  open<T>(component: Type<T>, config: KeModalConfig = {}): KeModalRef<T> {
    const ref = new KeModalRef<T>(
      (result?: T) => {
        this.close(result);
      },
      () => {
        this.close();
      },
    );

    const modalComponentRef = createComponent(KeModal, {
      environmentInjector: this.environmentInjector,
    });

    this.modalRef = modalComponentRef;

    const modalConfig: KeModalConfig = {
      size: 'md',
      closeOnBackdrop: true,
      closeOnEscape: true,
      showCloseButton: true,
      showHeader: true,
      showFooter: false,
      centered: true,
      backdrop: true,
      animation: true,
      preventClose: false,
      ...config,
    };

    modalComponentRef.setInput('config', modalConfig);

    modalComponentRef.instance.closed.subscribe(() => {
      ref.dismiss();
    });

    this.appRef.attachView(modalComponentRef.hostView);

    const hostElement = modalComponentRef.location.nativeElement as HTMLElement;

    document.body.appendChild(hostElement);

    modalComponentRef.changeDetectorRef.detectChanges();

    const dynamicComponentRef = modalComponentRef.instance.loadComponent(component);

    if (modalConfig.data !== undefined) {
      dynamicComponentRef.setInput('data', modalConfig.data);
    }

    dynamicComponentRef.changeDetectorRef.detectChanges();

    return ref;
  }

  close<T>(result?: T): void {
    if (!this.modalRef) {
      return;
    }

    this.modalRef.instance.destroyDynamicComponent();

    this.appRef.detachView(this.modalRef.hostView);

    this.modalRef.destroy();

    this.modalRef = undefined;
  }

  closeAll(): void {
    this.close();
  }
}
