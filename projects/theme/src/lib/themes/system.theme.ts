import { Theme } from '../models/theme.model';
import { LIGHT_COLORS, DARK_COLORS } from '../tokens/color.tokens';
import { DEFAULT_TYPOGRAPHY } from '../tokens/typography.tokens';
import { DEFAULT_SPACING } from '../tokens/spacing.tokens';
import { DEFAULT_RADIUS } from '../tokens/radius.tokens';
import { DEFAULT_SHADOWS } from '../tokens/shadow.tokens';

export const SYSTEM_THEME: Theme = {
  name: 'system',
  mode: 'system',

  /*
   * System theme supports both light and dark
   * color schemes. The actual scheme is resolved
   * by ThemeService using prefers-color-scheme.
   */
  colors: LIGHT_COLORS,

  typography: DEFAULT_TYPOGRAPHY,

  spacing: DEFAULT_SPACING,

  radius: DEFAULT_RADIUS,

  shadows: DEFAULT_SHADOWS,
};

/**
 * Color tokens available for system theme.
 */
export const SYSTEM_LIGHT_COLORS = LIGHT_COLORS;

export const SYSTEM_DARK_COLORS = DARK_COLORS;
