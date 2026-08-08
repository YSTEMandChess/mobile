import { StyleSheet, View, type ViewStyle } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { theme } from '@/design/theme';
import { radii, spacing } from '@/design/tokens';

export type ConnectionStatus = 'connecting' | 'offline' | 'online';

type ConnectionBannerProps = {
  message?: string;
  status: ConnectionStatus;
  testID?: string;
};

const defaultMessages: Record<ConnectionStatus, string> = {
  connecting: 'Connecting…',
  offline: 'You are offline. Some features may be unavailable.',
  online: 'Back online.',
};

export function ConnectionBanner({
  message,
  status,
  testID = 'connection-banner',
}: ConnectionBannerProps) {
  return (
    <View
      accessibilityLiveRegion={status === 'offline' ? 'assertive' : 'polite'}
      accessibilityRole="alert"
      accessible
      style={[styles.container, statusStyles[status]]}
      testID={testID}
    >
      <AppText variant="bodyStrong">
        {message ?? defaultMessages[status]}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radii.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});

const statusStyles = StyleSheet.create<Record<ConnectionStatus, ViewStyle>>({
  connecting: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
  },
  offline: {
    backgroundColor: theme.colors.errorBackground,
    borderColor: theme.colors.error,
  },
  online: {
    backgroundColor: theme.colors.successBackground,
    borderColor: theme.colors.brand,
  },
});
