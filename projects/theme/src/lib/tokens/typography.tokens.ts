export interface TypographyTokens {
  fontFamily: string;

  fontSizeXs: string;
  fontSizeSm: string;
  fontSizeMd: string;
  fontSizeLg: string;
  fontSizeXl: string;
  fontSize2Xl: string;
  fontSize3Xl: string;
  fontSize4Xl: string;

  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightSemibold: number;
  fontWeightBold: number;

  lineHeightTight: string;
  lineHeightNormal: string;
  lineHeightRelaxed: string;

  letterSpacingTight: string;
  letterSpacingNormal: string;
  letterSpacingWide: string;
}

export const DEFAULT_TYPOGRAPHY: TypographyTokens = {
  fontFamily: 'Inter, Roboto, Arial, sans-serif',

  fontSizeXs: '0.75rem',
  fontSizeSm: '0.875rem',
  fontSizeMd: '1rem',
  fontSizeLg: '1.125rem',
  fontSizeXl: '1.25rem',
  fontSize2Xl: '1.5rem',
  fontSize3Xl: '1.875rem',
  fontSize4Xl: '2.25rem',

  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  fontWeightBold: 700,

  lineHeightTight: '1.25',
  lineHeightNormal: '1.5',
  lineHeightRelaxed: '1.75',

  letterSpacingTight: '-0.025em',
  letterSpacingNormal: '0',
  letterSpacingWide: '0.025em',
};
