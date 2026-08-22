import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Screen } from '@/components/ui/Screen';
import { Spinner } from '@/components/ui/Spinner';
import { SessionProvider, useSession } from '@/providers/SessionProvider';

import '@/config/env';

export default function RootLayout() {
  return (
    <SessionProvider>
      <RootNavigator />
      <StatusBar style="dark" />
    </SessionProvider>
  );
}

function RootNavigator() {
  const { session } = useSession();

  if (session.status === 'bootstrapping') {
    return (
      <Screen background="patterned" centered testID="session-bootstrap-screen">
        <Spinner label="Preparing your session" />
      </Screen>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={session.status === 'anonymous'}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>

      <Stack.Protected guard={session.status === 'authenticated'}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}
