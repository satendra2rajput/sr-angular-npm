import { Inject, Injectable, signal } from '@angular/core';

import { Toast } from '../models/toast.model';
import { ToastConfig } from '../models/toast-config';
import { ToastType } from '../models/toast-type';

import { DEFAULT_TOAST_CONFIG, TOAST_CONFIG } from '../tokens/toast-config.token';

import { generateToastId } from '../utils/id';
import { Timer } from '../utils/timer';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  /**
   * Toast Store
   */
  private readonly _toasts = signal<Toast[]>([]);

  /**
   * Readonly Signal
   */
  readonly toasts = this._toasts.asReadonly();

  /**
   * Waiting Queue
   */
  private readonly queue: Toast[] = [];

  /**
   * Active Timers
   */
  private readonly timers = new Map<string, Timer>();

  /**
   * Final Config
   */
  private readonly config: ToastConfig;

  constructor(@Inject(TOAST_CONFIG) config: ToastConfig) {
    this.config = {
      ...DEFAULT_TOAST_CONFIG,
      ...config,
    };
  }

  // ============================================================
  // Public APIs
  // ============================================================

  success(message: string, title?: string): void {
    this.create('success', message, title);
  }

  error(message: string, title?: string): void {
    this.create('error', message, title);
  }

  warning(message: string, title?: string): void {
    this.create('warning', message, title);
  }

  info(message: string, title?: string): void {
    this.create('info', message, title);
  }

  remove(id: string): void {
    this.timers.get(id)?.stop();
    this.timers.delete(id);

    this._toasts.update((toasts) => toasts.filter((t) => t.id !== id));

    this.showNextFromQueue();
  }

  clear(): void {
    this.timers.forEach((timer) => timer.stop());

    this.timers.clear();

    this.queue.length = 0;

    this._toasts.set([]);
  }

  pause(id: string): void {
    this.timers.get(id)?.pause();
  }

  resume(id: string): void {
    this.timers.get(id)?.resume();
  }

  // ============================================================
  // Private Methods
  // ============================================================

  private create(type: ToastType, message: string, title?: string): void {
    if (this.config.preventDuplicates && this.hasDuplicate(message)) {
      return;
    }

    const toast: Toast = {
      id: generateToastId(),
      title,
      message,
      type,
      duration: this.config.duration!,
      visible: true,
      createdAt: Date.now(),
      position: this.config.position!,
      progressBar: this.config.progressBar!,
      closable: this.config.showClose!,
      pauseOnHover: this.config.pauseOnHover!,
      icon: undefined,
      action: undefined,
      actionHandler: undefined,
      cssClass: undefined,
      data: undefined,
    };

    const active = this._toasts();

    if (active.length >= this.config.max! && this.config.queue) {
      this.queue.push(toast);
      return;
    }

    const updated = this.config.newestOnTop ? [toast, ...active] : [...active, toast];

    this._toasts.set(updated);

    this.autoClose(toast);
  }

  private autoClose(toast: Toast): void {
    if (toast.duration <= 0) {
      return;
    }

    const timer = new Timer(toast.duration, () => this.remove(toast.id));

    this.timers.set(toast.id, timer);

    timer.start();
  }

  private hasDuplicate(message: string): boolean {
    return this._toasts().some((toast) => toast.message === message);
  }

  private showNextFromQueue(): void {
    if (!this.queue.length) {
      return;
    }

    const next = this.queue.shift();

    if (!next) {
      return;
    }

    this._toasts.update((toasts) =>
      this.config.newestOnTop ? [next, ...toasts] : [...toasts, next],
    );

    this.autoClose(next);
  }
}
