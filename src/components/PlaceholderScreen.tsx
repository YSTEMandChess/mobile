import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { theme } from '@/design/theme';
import { radii, spacing } from '@/design/tokens';
import type { PropsWithChildren } from 'react';

type PlaceholderScreenProps = PropsWithChildren<{
  description?: string;
  title: string;
}>;

export function PlaceholderScreen({
  children,
  description = 'This section will be added in a future release.',
  title,
}: PlaceholderScreenProps) {
  return (
    <Screen background="patterned" centered>
      <View style={styles.card}>
        <AppText style={styles.title} variant="title">
          {title}
        </AppText>
        <AppText color="muted" style={styles.description}>
          {description}
        </AppText>
        {children ? <View style={styles.actions}>{children}</View> : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceStrong,
    borderColor: theme.colors.brandSoft,
    borderRadius: radii.xl,
    borderWidth: 1,
    elevation: 3,
    padding: spacing.xl,
    shadowColor: theme.colors.text,
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    width: '100%',
  },
  title: {
    textAlign: 'center',
  },
  description: {
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.lg,
    width: '100%',
  },
});
