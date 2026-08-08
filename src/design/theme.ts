import { palette } from './tokens';

export const theme = {
  colorScheme: 'light',
  colors: {
    background: palette.backgroundSoft,
    backgroundPlain: palette.white,
    surface: palette.surface,
    surfaceStrong: palette.white,
    text: palette.ink,
    textMuted: palette.gray,
    textSubtle: palette.muted,
    textInverse: palette.white,
    primary: palette.ink,
    primaryPressed: palette.inkPressed,
    brand: palette.brandGreen,
    brandPressed: palette.brandGreenPressed,
    brandSoft: palette.brandGreenSoft,
    accent: palette.accentYellow,
    border: palette.border,
    pattern: palette.patternGreen,
    error: palette.error,
    errorBackground: palette.errorBackground,
    successBackground: palette.successBackground,
  },
} as const;

export type AppTheme = typeof theme;

export const colorSchemePolicy = {
  supported: ['light'],
  darkMode: 'intentionally-deferred',
  reason:
    'The current website and approved Figma direction define a light brand system but no approved dark palette.',
} as const;
