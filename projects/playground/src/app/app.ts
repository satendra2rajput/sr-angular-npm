import { KeModalService } from './../../../modal/src/lib/services/modal.service';
import { KeModal } from './../../../modal/src/lib/components/ke-modal/ke-modal';
import { LoaderService } from './../../../loader/src/lib/services/loader.service';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeToaster, ToastService } from '@kudoengineer/toast';
import { LoaderType } from '../../../loader/src/lib/models/loader.types';
import { KeLoader } from './../../../loader/src/lib/components/ke-loader/ke-loader';
@Component({
  selector: 'app-root',
  imports: [CommonModule, KeLoader, KeModal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('playground');

  private toast = inject(ToastService);
  private readonly loader = inject(LoaderService);
  private readonly modal = inject(KeModalService);
  showSuccess() {
    this.toast.success('Success Toast 🎉');
    console.log(this.toast.toasts());
  }

  showError() {
    this.toast.error('Error Toast ❌');
    console.log(this.toast.toasts());
  }

  showInfo() {
    this.toast.info('Info Toast ℹ️');
    console.log(this.toast.toasts());
  }

  showWarning() {
    this.toast.warning('Warning Toast ⚠️');
    console.log(this.toast.toasts());
  }

  load(type: LoaderType): void {
    this.loader.show({
      type,
      text: 'Loading...',
      overlay: true,
      overlayOpacity: 0.2,
      showContainer: false,
    });

    setTimeout(() => {
      this.loader.hide();
    }, 3000);
  }

  save() {
    // save logic
  }

  openUserForm(): void {
    const modalRef = this.modal.open(UserFormComponent, {
      title: 'Add User',
      size: 'md',
      closeOnBackdrop: false,
    });

    modalRef.afterClosed().then((result) => {
      console.log('Modal closed:', result);
    });
  }
}
