import { Theme } from '../models/theme.model';
import { LIGHT_THEME } from './light.theme';
import { DARK_THEME } from './dark.theme';
import { SYSTEM_THEME } from './system.theme';

export const BUILT_IN_THEMES: Record<string, Theme> = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
  system: SYSTEM_THEME,
};

export const DEFAULT_THEME_NAME = 'system';

export function getBuiltInTheme(name: string): Theme | undefined {
  return BUILT_IN_THEMES[name];
}

export function isBuiltInTheme(name: string): boolean {
  return name in BUILT_IN_THEMES;
}
