import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { theme } from '@/design/theme';
import { spacing } from '@/design/tokens';

type SpinnerProps = {
  color?: string;
  label?: string;
  size?: 'small' | 'large';
  testID?: string;
};

export function Spinner({
  color = theme.colors.brand,
  label = 'Loading',
  size = 'large',
  testID = 'spinner',
}: SpinnerProps) {
  return (
    <View
      accessibilityLabel={label}
      accessibilityRole="progressbar"
      accessible
      style={styles.container}
      testID={testID}
    >
      <ActivityIndicator
        accessibilityElementsHidden
        color={color}
        importantForAccessibility="no-hide-descendants"
        size={size}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
  },
});
