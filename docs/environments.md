# Environment configuration

The mobile app supports three explicit environments:

| Environment   | Purpose                                             | API requirement |
| ------------- | --------------------------------------------------- | --------------- |
| `development` | Local development and developer-owned test services | HTTP or HTTPS   |
| `preview`     | Shared internal testing and release candidates      | HTTPS           |
| `production`  | Publicly released application                       | HTTPS           |

Environment selection must use `EXPO_PUBLIC_APP_ENV`. Do not use `NODE_ENV` to
select a backend because Expo and other tools manage `NODE_ENV` for their own
build behavior.

## Local setup

Copy the tracked example file:

```powershell
Copy-Item .env.example .env.local
```

On macOS or Linux:

```bash
cp .env.example .env.local
```

Expo automatically loads `.env.local`. The file is ignored by Git and may be
changed for an individual developer's machine.

The required public values are:

```text
EXPO_PUBLIC_APP_ENV=development|preview|production
EXPO_PUBLIC_API_BASE_URL=https://...
```

The example API URL, `http://10.0.2.2:8000`, reaches port 8000 on the Windows
host from the standard Android emulator. Use:

- `http://localhost:8000` from an iOS simulator on the same Mac;
- the development computer's LAN address from a physical device;
- the approved HTTPS endpoint for preview or production.

Restart Expo after changing an environment file. Clear Metro's cache if a
previous value remains:

```bash
npx expo start --clear
```

## Validation

`src/config/env.ts` validates configuration when the application starts. It:

- accepts only `development`, `preview`, or `production`;
- requires a valid HTTP or HTTPS API URL;
- requires HTTPS for preview and production;
- rejects URLs containing credentials, query strings, or fragments;
- removes trailing slashes so API clients can join paths consistently.

Missing or invalid configuration raises `EnvironmentConfigError` with the
invalid field name and a safe explanation.

## Security

Every variable prefixed with `EXPO_PUBLIC_` is included in the application
bundle and is readable by users. Public endpoint locations may use this
prefix. Passwords, JWT signing secrets, database credentials, provider secret
keys, private certificates, and app-store credentials must never use it or be
committed to this repository.

## EAS environments

EAS profiles and hosted environment values are intentionally deferred until Y
STEM approves the Expo organization, project owner, application identifiers,
build budget, signing responsibilities, and release policy. Once approved,
development, preview, and production profiles must provide the same validated
variables described above.
