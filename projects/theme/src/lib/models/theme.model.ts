export type ThemeMode = 'light' | 'dark' | 'system';

export interface Theme {
  /**
   * Unique theme name.
   */
  name: string;

  /**
   * Theme mode.
   */
  mode: ThemeMode;

  /**
   * Theme color configuration.
   */
  colors?: ThemeColors;

  /**
   * Typography configuration.
   */
  typography?: ThemeTypography;

  /**
   * Spacing configuration.
   */
  spacing?: ThemeSpacing;

  /**
   * Border radius configuration.
   */
  radius?: ThemeRadius;

  /**
   * Shadow configuration.
   */
  shadows?: ThemeShadows;
}

export interface ThemeColors {
  primary?: string;
  secondary?: string;
  accent?: string;

  background?: string;
  surface?: string;
  foreground?: string;

  text?: string;
  textMuted?: string;

  border?: string;
  divider?: string;

  success?: string;
  warning?: string;
  danger?: string;
  info?: string;
}

export interface ThemeTypography {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number | string;
  lineHeight?: string;
}

export interface ThemeSpacing {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  xxl?: string;
}

export interface ThemeRadius {
  none?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  full?: string;
}

export interface ThemeShadows {
  none?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}
