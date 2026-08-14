import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { Button, Text, View } from 'react-native';

import { SessionProvider, useSession } from '@/providers/SessionProvider';

function SessionTestHarness() {
  const { session, mockSignInAs, signOut } = useSession();

  return (
    <View>
      <Text>{session.status}</Text>

      {session.status === 'authenticated' ? (
        <Text>{session.user.role}</Text>
      ) : null}

      <Button title="Mock student" onPress={() => mockSignInAs('student')} />

      <Button title="Mock mentor" onPress={() => mockSignInAs('mentor')} />

      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

describe('SessionProvider', () => {
  it('finishes bootstrap as anonymous', async () => {
    render(
      <SessionProvider>
        <SessionTestHarness />
      </SessionProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('anonymous')).toBeOnTheScreen();
    });
  });

  it('supports mocked student sign-in and sign-out', async () => {
    render(
      <SessionProvider>
        <SessionTestHarness />
      </SessionProvider>,
    );

    fireEvent.press(
      screen.getByRole('button', {
        name: 'Mock student',
      }),
    );

    expect(screen.getByText('authenticated')).toBeOnTheScreen();

    expect(screen.getByText('student')).toBeOnTheScreen();

    fireEvent.press(
      screen.getByRole('button', {
        name: 'Sign out',
      }),
    );

    expect(screen.getByText('anonymous')).toBeOnTheScreen();
  });

  it('supports mocked mentor sign-in', () => {
    render(
      <SessionProvider>
        <SessionTestHarness />
      </SessionProvider>,
    );

    fireEvent.press(
      screen.getByRole('button', {
        name: 'Mock mentor',
      }),
    );

    expect(screen.getByText('mentor')).toBeOnTheScreen();
  });
});
