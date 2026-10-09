import { ThemeMode } from './theme.model';

export interface ThemeOptions {
  /**
   * Default theme mode.
   * @default 'system'
   */
  defaultMode?: ThemeMode;

  /**
   * Storage key used to persist the selected theme.
   * @default 'ke-theme'
   */
  storageKey?: string;

  /**
   * CSS class added to the document root.
   * @default 'ke-theme'
   */
  cssClass?: string;

  /**
   * Whether the selected theme should be persisted.
   * @default true
   */
  persist?: boolean;

  /**
   * Whether to automatically detect the system color scheme.
   * @default true
   */
  followSystem?: boolean;
}
