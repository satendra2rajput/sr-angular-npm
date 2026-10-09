import { ToastType } from './toast-type';

export interface Toast {
  /**
   * Unique id
   */
  id: string;

  /**
   * Title
   */
  title?: string;

  /**
   * Main message
   */
  message: string;

  /**
   * Success | Error | Warning | Info
   */
  type: ToastType;

  /**
   * Auto dismiss duration
   */
  duration: number;

  /**
   * Current visibility
   */
  visible: boolean;

  /**
   * Creation timestamp
   */
  createdAt: number;

  /**
   * Position
   */
  position:
    'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

  /**
   * Progress bar
   */
  progressBar: boolean;

  /**
   * Close button
   */
  closable: boolean;

  /**
   * Pause on hover
   */
  pauseOnHover: boolean;

  /**
   * Icon
   */
  icon?: string;

  /**
   * Optional action text
   */
  action?: string;

  /**
   * Callback when action clicked
   */
  actionHandler?: () => void;

  /**
   * Custom css class
   */
  cssClass?: string;

  /**
   * Data payload
   */
  data?: unknown;
}
