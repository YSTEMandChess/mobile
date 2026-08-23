import { useQueryClient } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

import { createQueryClient, QueryProvider } from '@/providers/QueryProvider';

function QueryClientProbe() {
  const queryClient = useQueryClient();

  return (
    <Text>
      {queryClient ? 'Query client available' : 'Query client missing'}
    </Text>
  );
}

describe('QueryProvider', () => {
  it('provides a query client to its children', () => {
    render(
      <QueryProvider>
        <QueryClientProbe />
      </QueryProvider>,
    );

    expect(screen.getByText('Query client available')).toBeOnTheScreen();
  });

  it('creates isolated query clients', () => {
    const firstClient = createQueryClient();
    const secondClient = createQueryClient();

    expect(firstClient).not.toBe(secondClient);
  });

  it('disables automatic retries', () => {
    const queryClient = createQueryClient();

    expect(queryClient.getDefaultOptions()).toMatchObject({
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    });
  });
});
