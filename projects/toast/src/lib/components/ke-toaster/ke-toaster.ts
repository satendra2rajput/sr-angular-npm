import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { KeToast } from '../ke-toast/ke-toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ke-toaster',
  imports: [CommonModule, KeToast],
  templateUrl: './ke-toaster.html',
  styleUrl: './ke-toaster.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeToaster {
  readonly toastService = inject(ToastService);

  readonly toasts = this.toastService.toasts;

  remove(id: string): void {
    this.toastService.remove(id);
  }
}
