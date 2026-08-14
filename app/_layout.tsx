import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SessionProvider } from '@/providers/SessionProvider';

import '@/config/env';

export default function RootLayout() {
  return (
    <SessionProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(app)" />
      </Stack>

      <StatusBar style="dark" />
    </SessionProvider>
  );
}
