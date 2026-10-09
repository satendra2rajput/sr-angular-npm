import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, DOCUMENT, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

import { ThemeMode } from '../models/theme.model';
import { ThemeOptions } from '../models/theme-options.model';
import { THEME_OPTIONS } from '../providers/theme.provider';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  private readonly providedOptions = inject<ThemeOptions>(THEME_OPTIONS, {
    optional: true,
  });

  private readonly defaultOptions: Required<ThemeOptions> = {
    defaultMode: 'system',
    storageKey: 'ke-theme',
    cssClass: 'ke-theme',
    persist: true,
    followSystem: true,
  };

  private readonly options: Required<ThemeOptions> = {
    ...this.defaultOptions,
    ...this.providedOptions,
  };

  /**
   * Currently selected theme mode.
   */
  readonly mode = signal<ThemeMode>(this.options.defaultMode);

  /**
   * Currently active theme.
   */
  readonly activeTheme = signal<'light' | 'dark'>('light');

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.initialize();
  }

  /**
   * Initialize theme.
   */
  private initialize(): void {
    const storedTheme = this.getStoredTheme();

    if (storedTheme) {
      this.mode.set(storedTheme);
    }

    this.applyTheme(this.mode());

    if (this.options.followSystem) {
      this.watchSystemTheme();
    }
  }

  /**
   * Set theme mode.
   */
  setTheme(mode: ThemeMode): void {
    this.mode.set(mode);

    this.applyTheme(mode);

    if (this.options.persist) {
      this.saveTheme(mode);
    }
  }

  /**
   * Toggle between light and dark.
   *
   * If current mode is system, it toggles
   * from the currently active theme.
   */
  toggle(): void {
    const nextTheme = this.activeTheme() === 'dark' ? 'light' : 'dark';

    this.setTheme(nextTheme);
  }

  /**
   * Use system theme.
   */
  setSystemTheme(): void {
    this.setTheme('system');
  }

  /**
   * Get selected theme mode.
   */
  getTheme(): ThemeMode {
    return this.mode();
  }

  /**
   * Check active dark theme.
   */
  isDark(): boolean {
    return this.activeTheme() === 'dark';
  }

  /**
   * Check active light theme.
   */
  isLight(): boolean {
    return this.activeTheme() === 'light';
  }

  /**
   * Reset theme to configured default.
   */
  reset(): void {
    this.removeStoredTheme();

    this.mode.set(this.options.defaultMode);

    this.applyTheme(this.options.defaultMode);
  }

  /**
   * Apply theme to document.
   */
  private applyTheme(mode: ThemeMode): void {
    const resolvedTheme = this.resolveTheme(mode);

    this.activeTheme.set(resolvedTheme);

    const root = this.document.documentElement;

    root.classList.remove(`${this.options.cssClass}-light`, `${this.options.cssClass}-dark`);

    root.classList.add(`${this.options.cssClass}-${resolvedTheme}`);

    root.setAttribute('data-theme', resolvedTheme);

    root.style.colorScheme = resolvedTheme;
  }

  /**
   * Resolve system theme.
   */
  private resolveTheme(mode: ThemeMode): 'light' | 'dark' {
    if (mode !== 'system') {
      return mode;
    }

    if (!isPlatformBrowser(this.platformId)) {
      return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Watch operating system theme changes.
   */
  private watchSystemTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const listener = (): void => {
      if (this.mode() === 'system') {
        this.applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', listener);

    this.destroyRef.onDestroy(() => {
      mediaQuery.removeEventListener('change', listener);
    });
  }

  /**
   * Get stored theme.
   */
  private getStoredTheme(): ThemeMode | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const value = localStorage.getItem(this.options.storageKey);

    if (value === 'light' || value === 'dark' || value === 'system') {
      return value;
    }

    return null;
  }

  /**
   * Save theme.
   */
  private saveTheme(mode: ThemeMode): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem(this.options.storageKey, mode);
  }

  /**
   * Remove stored theme.
   */
  private removeStoredTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.removeItem(this.options.storageKey);
  }
}
