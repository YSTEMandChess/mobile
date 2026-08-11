import { Tabs } from 'expo-router';

import { theme } from '@/design/theme';
import { fontSizes, fontWeights, spacing } from '@/design/tokens';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.textSubtle,
        tabBarLabelStyle: {
          fontSize: fontSizes.caption,
          fontWeight: fontWeights.semibold,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.surfaceStrong,
          borderTopColor: theme.colors.border,
          paddingTop: spacing.xs,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="learn" options={{ title: 'Learn' }} />
      <Tabs.Screen name="play" options={{ title: 'Play' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
