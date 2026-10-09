export type KeModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface KeModalConfig {
  title?: string;
  size?: KeModalSize;

  width?: string;
  height?: string;

  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;

  showCloseButton?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;

  centered?: boolean;
  backdrop?: boolean;
  animation?: boolean;

  preventClose?: boolean;

  data?: unknown;
}
