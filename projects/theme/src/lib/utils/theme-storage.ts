import { ThemeMode } from '../models/theme.model';

const DEFAULT_STORAGE_KEY = 'ke-theme';

/**
 * Read the stored theme mode.
 */
export function getStoredTheme(storageKey: string = DEFAULT_STORAGE_KEY): ThemeMode | null {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  const value = localStorage.getItem(storageKey);

  if (value === 'light' || value === 'dark' || value === 'system') {
    return value;
  }

  return null;
}

/**
 * Store the selected theme mode.
 */
export function setStoredTheme(mode: ThemeMode, storageKey: string = DEFAULT_STORAGE_KEY): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(storageKey, mode);
}

/**
 * Remove the stored theme.
 */
export function removeStoredTheme(storageKey: string = DEFAULT_STORAGE_KEY): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.removeItem(storageKey);
}

/**
 * Check whether a theme is stored.
 */
export function hasStoredTheme(storageKey: string = DEFAULT_STORAGE_KEY): boolean {
  return getStoredTheme(storageKey) !== null;
}
