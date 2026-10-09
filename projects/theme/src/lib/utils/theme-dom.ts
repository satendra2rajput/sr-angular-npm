import { ThemeMode } from '../models/theme.model';

export type ResolvedTheme = 'light' | 'dark';

export interface ThemeDomOptions {
  cssClass: string;
}

/**
 * Resolve the actual theme from the selected mode.
 */
export function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === 'light') {
    return 'light';
  }

  if (mode === 'dark') {
    return 'dark';
  }

  return getSystemTheme();
}

/**
 * Get the operating system color scheme.
 */
export function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Apply theme classes and attributes to the document.
 */
export function applyThemeToDocument(mode: ThemeMode, options: ThemeDomOptions): ResolvedTheme {
  if (typeof document === 'undefined') {
    return resolveTheme(mode);
  }

  const resolvedTheme = resolveTheme(mode);
  const root = document.documentElement;

  root.classList.remove(`${options.cssClass}-light`, `${options.cssClass}-dark`);

  root.classList.add(`${options.cssClass}-${resolvedTheme}`);

  root.setAttribute('data-theme', resolvedTheme);

  root.style.colorScheme = resolvedTheme;

  return resolvedTheme;
}

/**
 * Remove all theme classes and attributes.
 */
export function removeThemeFromDocument(cssClass: string): void {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;

  root.classList.remove(`${cssClass}-light`, `${cssClass}-dark`);

  root.removeAttribute('data-theme');

  root.style.removeProperty('color-scheme');
}
