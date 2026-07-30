import { z } from 'zod';

const publicEnvironmentSchema = z.object({
  appEnv: z.enum(['development', 'preview', 'production']),
  apiBaseUrl: z.string().trim().min(1).url(),
});

export type AppEnvironment = z.infer<typeof publicEnvironmentSchema>['appEnv'];

export interface PublicEnvironment {
  appEnv: AppEnvironment;
  apiBaseUrl: string;
}

export class EnvironmentConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EnvironmentConfigError';
  }
}

interface PublicEnvironmentInput {
  appEnv?: string;
  apiBaseUrl?: string;
}

function invalidConfiguration(details: string): EnvironmentConfigError {
  return new EnvironmentConfigError(
    `Invalid public environment configuration: ${details}`,
  );
}

export function parsePublicEnvironment(
  input: PublicEnvironmentInput,
): PublicEnvironment {
  const result = publicEnvironmentSchema.safeParse(input);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => {
        const field = issue.path.join('.') || 'environment';
        return `${field}: ${issue.message}`;
      })
      .join('; ');

    throw invalidConfiguration(details);
  }

  const apiUrl = new URL(result.data.apiBaseUrl);

  if (apiUrl.protocol !== 'http:' && apiUrl.protocol !== 'https:') {
    throw invalidConfiguration('apiBaseUrl must use HTTP or HTTPS');
  }

  if (result.data.appEnv !== 'development' && apiUrl.protocol !== 'https:') {
    throw invalidConfiguration('apiBaseUrl must use HTTPS outside development');
  }

  if (apiUrl.username || apiUrl.password) {
    throw invalidConfiguration('apiBaseUrl must not contain credentials');
  }

  if (apiUrl.search || apiUrl.hash) {
    throw invalidConfiguration(
      'apiBaseUrl must not contain a query string or fragment',
    );
  }

  return Object.freeze({
    appEnv: result.data.appEnv,
    apiBaseUrl: apiUrl.toString().replace(/\/+$/, ''),
  });
}

export const env = parsePublicEnvironment({
  appEnv: process.env.EXPO_PUBLIC_APP_ENV,
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
});
