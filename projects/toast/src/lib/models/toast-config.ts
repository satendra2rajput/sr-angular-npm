import { ToastType } from './toast-type';

export type ToastPosition =
  'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type ToastTheme = 'light' | 'dark' | 'auto';

export type ToastAnimation = 'fade' | 'slide' | 'scale' | 'bounce';

export interface ToastConfig {
  /**
   * Default duration (ms)
   */
  duration?: number;

  /**
   * Toast position
   */
  position?: ToastPosition;

  /**
   * Show close button
   */
  showClose?: boolean;

  /**
   * Show progress bar
   */
  progressBar?: boolean;

  /**
   * Pause timer while hovering
   */
  pauseOnHover?: boolean;

  /**
   * Maximum visible toasts
   */
  max?: number;

  /**
   * Prevent duplicate messages
   */
  preventDuplicates?: boolean;

  /**
   * Queue remaining toasts
   */
  queue?: boolean;

  /**
   * RTL Support
   */
  rtl?: boolean;

  /**
   * Light / Dark / Auto
   */
  theme?: ToastTheme;

  /**
   * Animation style
   */
  animation?: ToastAnimation;

  /**
   * Default icon visibility
   */
  showIcon?: boolean;

  /**
   * Newest toast on top
   */
  newestOnTop?: boolean;

  /**
   * Default type
   */
  type?: ToastType;
}
