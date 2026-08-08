export const palette = {
  brandGreen: '#7FCC26',
  brandGreenPressed: '#6DAD1F',
  brandGreenSoft: '#BFD99E',
  backgroundSoft: '#E5F3D2',
  accentYellow: '#EAD94C',
  patternGreen: '#C1D2AA',
  ink: '#1F1F1F',
  inkPressed: '#000000',
  gray: '#5C5C5C',
  muted: '#8A8A8A',
  border: '#D6D6D6',
  surface: '#F9FAF7',
  white: '#FFFFFF',
  error: '#D64545',
  errorBackground: '#F5E9E9',
  successBackground: '#EEF7E3',
} as const;

export const spacing = {
  none: 0,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const radii = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const fontSizes = {
  caption: 13,
  label: 15,
  body: 16,
  heading: 20,
  title: 28,
  display: 36,
} as const;

export const lineHeights = {
  caption: 18,
  label: 20,
  body: 24,
  heading: 28,
  title: 36,
  display: 44,
} as const;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const sizes = {
  minimumTouchTarget: 48,
  iconSm: 16,
  iconMd: 24,
  spinner: 24,
  contentMaxWidth: 720,
} as const;

export const motion = {
  quick: 150,
  standard: 250,
  deliberate: 400,
} as const;
