import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import {
  initialSessionState,
  sessionReducer,
  type SessionState,
  type SessionUser,
  type UserRole,
} from '@/state/session';

type SessionContextValue = {
  session: SessionState;
  mockSignInAs: (role: UserRole) => void;
  signOut: () => void;
};

const mockUsers: Record<UserRole, SessionUser> = {
  student: {
    id: 'mock-student',
    displayName: 'Mock Student',
    role: 'student',
  },
  mentor: {
    id: 'mock-mentor',
    displayName: 'Mock Mentor',
    role: 'mentor',
  },
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, dispatch] = useReducer(sessionReducer, initialSessionState);

  useEffect(() => {
    dispatch({ type: 'bootstrapCompleted' });
  }, []);

  function mockSignInAs(role: UserRole) {
    dispatch({
      type: 'authenticated',
      user: mockUsers[role],
    });
  }

  function signOut() {
    dispatch({ type: 'signedOut' });
  }

  return (
    <SessionContext.Provider
      value={{
        session,
        mockSignInAs,
        signOut,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (context === null) {
    throw new Error('useSession must be used within SessionProvider');
  }

  return context;
}
