import { router } from 'expo-router';

import { SessionPlaceholderScreen } from '@/components/SessionPlaceholderScreen';
import { Button } from '@/components/ui/Button';
import { useSession } from '@/providers/SessionProvider';

export default function HomeRoute() {
  const { session } = useSession();

  const isMentor =
    session.status === 'authenticated' && session.user.role === 'mentor';

  return (
    <SessionPlaceholderScreen title="Home">
      {isMentor ? (
        <Button onPress={() => router.push('/mentor')} variant="secondary">
          Open mentor area
        </Button>
      ) : null}
    </SessionPlaceholderScreen>
  );
}
