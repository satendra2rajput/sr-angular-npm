export interface ColorTokens {
  primary: string;
  primaryHover: string;
  primaryActive: string;

  secondary: string;
  secondaryHover: string;
  secondaryActive: string;

  accent: string;

  background: string;
  surface: string;
  surfaceHover: string;

  foreground: string;
  text: string;
  textMuted: string;
  textDisabled: string;

  border: string;
  divider: string;

  success: string;
  warning: string;
  danger: string;
  info: string;

  overlay: string;
}

export const LIGHT_COLORS: ColorTokens = {
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  primaryActive: '#1E40AF',

  secondary: '#4F46E5',
  secondaryHover: '#4338CA',
  secondaryActive: '#3730A3',

  accent: '#7C3AED',

  background: '#FFFFFF',
  surface: '#F9FAFB',
  surfaceHover: '#F3F4F6',

  foreground: '#111827',
  text: '#111827',
  textMuted: '#6B7280',
  textDisabled: '#9CA3AF',

  border: '#E5E7EB',
  divider: '#E5E7EB',

  success: '#16A34A',
  warning: '#D97706',
  danger: '#DC2626',
  info: '#0284C7',

  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const DARK_COLORS: ColorTokens = {
  primary: '#3B82F6',
  primaryHover: '#60A5FA',
  primaryActive: '#93C5FD',

  secondary: '#6366F1',
  secondaryHover: '#818CF8',
  secondaryActive: '#A5B4FC',

  accent: '#8B5CF6',

  background: '#0F172A',
  surface: '#1E293B',
  surfaceHover: '#334155',

  foreground: '#F8FAFC',
  text: '#F8FAFC',
  textMuted: '#94A3B8',
  textDisabled: '#64748B',

  border: '#334155',
  divider: '#334155',

  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#38BDF8',

  overlay: 'rgba(0, 0, 0, 0.7)',
};
