export interface SpacingTokens {
  none: string;

  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;

  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;

  section: string;
  container: string;
}

export const DEFAULT_SPACING: SpacingTokens = {
  none: '0',

  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',

  '3xl': '4rem',
  '4xl': '5rem',
  '5xl': '6rem',
  '6xl': '8rem',

  section: '4rem',
  container: '1200px',
};
