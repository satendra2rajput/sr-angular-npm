import { ThemeMode } from '../models/theme.model';

export const THEME_STORAGE_KEY = 'ke-theme';

export const THEME_CSS_CLASS = 'ke-theme';

export const THEME_ATTRIBUTE = 'data-theme';

export const THEME_MODES: readonly ThemeMode[] = ['light', 'dark', 'system'] as const;

export const DEFAULT_THEME_MODE: ThemeMode = 'system';

export const DEFAULT_THEME_OPTIONS = {
  defaultMode: DEFAULT_THEME_MODE,
  storageKey: THEME_STORAGE_KEY,
  cssClass: THEME_CSS_CLASS,
  persist: true,
  followSystem: true,
} as const;

export const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';
