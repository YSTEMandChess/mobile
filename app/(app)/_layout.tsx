import { Stack } from 'expo-router';

import { useSession } from '@/providers/SessionProvider';

export default function AppLayout() {
  const { session } = useSession();

  const isMentor =
    session.status === 'authenticated' && session.user.role === 'mentor';

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />

      <Stack.Protected guard={isMentor}>
        <Stack.Screen
          name="mentor/index"
          options={{
            headerShown: true,
            title: 'Mentor',
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
