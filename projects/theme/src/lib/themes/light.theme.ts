import { Theme } from '../models/theme.model';
import { LIGHT_COLORS } from '../tokens/color.tokens';
import { DEFAULT_TYPOGRAPHY } from '../tokens/typography.tokens';
import { DEFAULT_SPACING } from '../tokens/spacing.tokens';
import { DEFAULT_RADIUS } from '../tokens/radius.tokens';
import { DEFAULT_SHADOWS } from '../tokens/shadow.tokens';

export const LIGHT_THEME: Theme = {
  name: 'light',
  mode: 'light',

  colors: LIGHT_COLORS,

  typography: DEFAULT_TYPOGRAPHY,

  spacing: DEFAULT_SPACING,

  radius: DEFAULT_RADIUS,

  shadows: DEFAULT_SHADOWS,
};
