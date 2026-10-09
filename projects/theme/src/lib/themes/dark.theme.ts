import { Theme } from '../models/theme.model';
import { DARK_COLORS } from '../tokens/color.tokens';
import { DEFAULT_TYPOGRAPHY } from '../tokens/typography.tokens';
import { DEFAULT_SPACING } from '../tokens/spacing.tokens';
import { DEFAULT_RADIUS } from '../tokens/radius.tokens';
import { DEFAULT_SHADOWS } from '../tokens/shadow.tokens';

export const DARK_THEME: Theme = {
  name: 'dark',
  mode: 'dark',

  colors: DARK_COLORS,

  typography: DEFAULT_TYPOGRAPHY,

  spacing: DEFAULT_SPACING,

  radius: DEFAULT_RADIUS,

  shadows: DEFAULT_SHADOWS,
};
