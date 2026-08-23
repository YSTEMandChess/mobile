import { SessionPlaceholderScreen } from '@/components/SessionPlaceholderScreen';
import { Button } from '@/components/ui/Button';
import { useSession } from '@/providers/SessionProvider';

export default function ProfileRoute() {
  const { signOut } = useSession();

  return (
    <SessionPlaceholderScreen title="Profile">
      <Button onPress={signOut} variant="secondary">
        Sign out
      </Button>
    </SessionPlaceholderScreen>
  );
}
