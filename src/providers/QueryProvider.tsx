import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren, useState } from 'react';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // F6 will introduce error-aware retry rules.
      },
      mutations: {
        retry: false,
      },
    },
  });
}

export function QueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
