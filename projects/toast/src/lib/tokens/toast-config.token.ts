import { InjectionToken } from '@angular/core';
import { ToastConfig } from '../models/toast-config';

export const DEFAULT_TOAST_CONFIG: ToastConfig = {
  duration: 4000,
  position: 'top-right',
  showClose: true,
  progressBar: true,
  pauseOnHover: true,
  max: 5,
  preventDuplicates: true,
  queue: true,
  rtl: false,
  theme: 'light',
  animation: 'slide',
  showIcon: true,
  newestOnTop: true,
  type: 'info',
};

export const TOAST_CONFIG = new InjectionToken<ToastConfig>('TOAST_CONFIG', {
  factory: () => DEFAULT_TOAST_CONFIG,
});
