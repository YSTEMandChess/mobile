import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import '@/config/env';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
