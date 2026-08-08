import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { theme } from '@/design/theme';
import { radii, spacing } from '@/design/tokens';

type InlineErrorProps = {
  message: string;
  title?: string;
  testID?: string;
};

export function InlineError({
  message,
  title = 'Something went wrong',
  testID = 'inline-error',
}: InlineErrorProps) {
  return (
    <View
      accessibilityLiveRegion="assertive"
      accessibilityRole="alert"
      accessible
      style={styles.container}
      testID={testID}
    >
      <AppText color="error" variant="bodyStrong">
        {title}
      </AppText>
      <AppText color="error">{message}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.errorBackground,
    borderColor: theme.colors.error,
    borderLeftWidth: 4,
    borderRadius: radii.md,
    gap: spacing.xxs,
    padding: spacing.md,
  },
});
