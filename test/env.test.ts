import { EnvironmentConfigError, parsePublicEnvironment } from '@/config/env';

describe('parsePublicEnvironment', () => {
  it.each(['development', 'preview', 'production'] as const)(
    'accepts a valid %s environment',
    (appEnv) => {
      expect(
        parsePublicEnvironment({
          appEnv,
          apiBaseUrl: 'https://api.example.org/v1/',
        }),
      ).toEqual({
        appEnv,
        apiBaseUrl: 'https://api.example.org/v1',
      });
    },
  );

  it('allows HTTP for local development', () => {
    expect(
      parsePublicEnvironment({
        appEnv: 'development',
        apiBaseUrl: 'http://10.0.2.2:8000',
      }),
    ).toEqual({
      appEnv: 'development',
      apiBaseUrl: 'http://10.0.2.2:8000',
    });
  });

  it.each(['preview', 'production'] as const)(
    'rejects HTTP for %s',
    (appEnv) => {
      expect(() =>
        parsePublicEnvironment({
          appEnv,
          apiBaseUrl: 'http://api.example.org',
        }),
      ).toThrow('apiBaseUrl must use HTTPS outside development');
    },
  );

  it.each([
    [{ apiBaseUrl: 'https://api.example.org' }, 'appEnv'],
    [{ appEnv: 'development' }, 'apiBaseUrl'],
    [{ appEnv: 'staging', apiBaseUrl: 'https://api.example.org' }, 'appEnv'],
    [{ appEnv: 'development', apiBaseUrl: 'not-a-url' }, 'apiBaseUrl'],
  ])('rejects missing or malformed values', (input, expectedField) => {
    expect(() => parsePublicEnvironment(input)).toThrow(EnvironmentConfigError);
    expect(() => parsePublicEnvironment(input)).toThrow(expectedField);
  });

  it('rejects credentials embedded in the API URL', () => {
    expect(() =>
      parsePublicEnvironment({
        appEnv: 'development',
        apiBaseUrl: 'https://user:password@api.example.org',
      }),
    ).toThrow('apiBaseUrl must not contain credentials');
  });

  it('rejects non-HTTP API URLs', () => {
    expect(() =>
      parsePublicEnvironment({
        appEnv: 'development',
        apiBaseUrl: 'ftp://api.example.org',
      }),
    ).toThrow('apiBaseUrl must use HTTP or HTTPS');
  });

  it('rejects query strings and fragments in the API URL', () => {
    expect(() =>
      parsePublicEnvironment({
        appEnv: 'development',
        apiBaseUrl: 'https://api.example.org?token=public#section',
      }),
    ).toThrow('apiBaseUrl must not contain a query string or fragment');
  });
});
