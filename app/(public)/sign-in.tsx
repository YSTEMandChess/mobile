import { PlaceholderScreen } from '@/components/PlaceholderScreen';
import { Button } from '@/components/ui/Button';
import { useSession } from '@/providers/SessionProvider';

export default function SignInRoute() {
  const { mockSignInAs } = useSession();

  return (
    <PlaceholderScreen
      description="Choose a temporary mocked role to test the navigation foundation."
      title="Sign in"
    >
      <Button onPress={() => mockSignInAs('student')} variant="brand">
        Continue as student
      </Button>

      <Button onPress={() => mockSignInAs('mentor')} variant="secondary">
        Continue as mentor
      </Button>
    </PlaceholderScreen>
  );
}
