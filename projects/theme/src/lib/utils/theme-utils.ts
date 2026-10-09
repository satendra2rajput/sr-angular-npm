import { ThemeMode } from '../models/theme.model';

/**
 * Check whether the provided value is a valid theme mode.
 */
export function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system';
}

/**
 * Normalize a theme mode.
 *
 * Invalid or undefined values fall back to system.
 */
export function normalizeThemeMode(mode: unknown): ThemeMode {
  return isThemeMode(mode) ? mode : 'system';
}

/**
 * Get the opposite theme.
 */
export function getOppositeTheme(mode: 'light' | 'dark'): 'light' | 'dark' {
  return mode === 'light' ? 'dark' : 'light';
}

/**
 * Check whether a theme mode is system based.
 */
export function isSystemTheme(mode: ThemeMode): boolean {
  return mode === 'system';
}

/**
 * Check whether a theme mode is dark.
 */
export function isDarkTheme(mode: ThemeMode): boolean {
  return mode === 'dark';
}

/**
 * Check whether a theme mode is light.
 */
export function isLightTheme(mode: ThemeMode): boolean {
  return mode === 'light';
}

/**
 * Convert a theme mode into a readable label.
 */
export function getThemeLabel(mode: ThemeMode): string {
  switch (mode) {
    case 'light':
      return 'Light';

    case 'dark':
      return 'Dark';

    case 'system':
      return 'System';

    default:
      return 'System';
  }
}
