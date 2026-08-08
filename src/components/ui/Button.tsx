import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Spinner } from '@/components/ui/Spinner';
import { theme } from '@/design/theme';
import { radii, sizes, spacing } from '@/design/tokens';

export type ButtonVariant = 'primary' | 'brand' | 'secondary';

type ButtonProps = Omit<PressableProps, 'children' | 'disabled' | 'style'> & {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  style?: StyleProp<ViewStyle>;
  variant?: ButtonVariant;
};

export function Button({
  accessibilityState,
  children,
  disabled = false,
  loading = false,
  loadingLabel = 'Loading',
  style,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const textColor = variant === 'primary' ? 'inverse' : 'default';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{
        ...accessibilityState,
        busy: loading,
        disabled: isDisabled,
      }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        pressed && !isDisabled ? pressedStyles[variant] : undefined,
        isDisabled ? styles.disabled : undefined,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <Spinner
            color={
              variant === 'primary'
                ? theme.colors.textInverse
                : theme.colors.text
            }
            label={loadingLabel}
            size="small"
          />
        </View>
      ) : null}
      <AppText color={textColor} variant="label">
        {loading ? loadingLabel : children}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: radii.pill,
    borderWidth: 2,
    flexDirection: 'row',
    gap: spacing.xs,
    justifyContent: 'center',
    minHeight: sizes.minimumTouchTarget,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
});

const variantStyles = StyleSheet.create<Record<ButtonVariant, ViewStyle>>({
  primary: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  brand: {
    backgroundColor: theme.colors.brand,
    borderColor: theme.colors.brand,
  },
  secondary: {
    backgroundColor: theme.colors.surfaceStrong,
    borderColor: theme.colors.primary,
  },
});

const pressedStyles = StyleSheet.create<Record<ButtonVariant, ViewStyle>>({
  primary: {
    backgroundColor: theme.colors.primaryPressed,
    borderColor: theme.colors.primaryPressed,
  },
  brand: {
    backgroundColor: theme.colors.brandPressed,
    borderColor: theme.colors.brandPressed,
  },
  secondary: {
    backgroundColor: theme.colors.background,
  },
});
