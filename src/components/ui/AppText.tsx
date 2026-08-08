import type { ComponentProps } from 'react';
import {
  StyleSheet,
  Text as ReactNativeText,
  type TextStyle,
} from 'react-native';

import { theme } from '@/design/theme';
import { fontSizes, fontWeights, lineHeights } from '@/design/tokens';

export type TextVariant =
  'display' | 'title' | 'heading' | 'body' | 'bodyStrong' | 'label' | 'caption';

export type TextColor = 'default' | 'muted' | 'subtle' | 'inverse' | 'error';

type AppTextProps = ComponentProps<typeof ReactNativeText> & {
  variant?: TextVariant;
  color?: TextColor;
};

const headerVariants = new Set<TextVariant>(['display', 'title', 'heading']);

export function AppText({
  accessibilityRole,
  color = 'default',
  style,
  variant = 'body',
  ...props
}: AppTextProps) {
  return (
    <ReactNativeText
      accessibilityRole={
        accessibilityRole ??
        (headerVariants.has(variant) ? 'header' : undefined)
      }
      style={[styles.base, variantStyles[variant], colorStyles[color], style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    color: theme.colors.text,
  },
});

const variantStyles = StyleSheet.create<Record<TextVariant, TextStyle>>({
  display: {
    fontSize: fontSizes.display,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.display,
  },
  title: {
    fontSize: fontSizes.title,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.title,
  },
  heading: {
    fontSize: fontSizes.heading,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.heading,
  },
  body: {
    fontSize: fontSizes.body,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.body,
  },
  bodyStrong: {
    fontSize: fontSizes.body,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.body,
  },
  label: {
    fontSize: fontSizes.label,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.label,
  },
  caption: {
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.caption,
  },
});

const colorStyles = StyleSheet.create<Record<TextColor, TextStyle>>({
  default: {
    color: theme.colors.text,
  },
  muted: {
    color: theme.colors.textMuted,
  },
  subtle: {
    color: theme.colors.textSubtle,
  },
  inverse: {
    color: theme.colors.textInverse,
  },
  error: {
    color: theme.colors.error,
  },
});
