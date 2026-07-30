# Y STEM and Chess Mobile

This repository contains the new Y STEM and Chess mobile application. It is a
fresh Expo and React Native TypeScript project; using the previous TritonSE
application as a reference.

## Prerequisites

- Node.js 24 LTS. The repository pins Node `24.18.0` in `.nvmrc`.
- npm 11.
- Android Studio and an Android emulator for Android development. (download Android Studo, add virtual device)
- macOS, Xcode, and an iOS simulator for local iOS development.

If you use `nvm`, select the pinned Node version:

```bash
nvm install
nvm use
```

## Install

From the repository root:

```bash
npm ci
```

The committed `package-lock.json` is the source of truth for dependency
versions.

## Configure the environment

Copy the example environment file before starting the app:

```powershell
Copy-Item .env.example .env.local
```

On macOS or Linux:

```bash
cp .env.example .env.local
```

The example targets a backend running on the Windows host from an Android
emulator. Update the API URL for a different platform or environment. The app
validates its public configuration at startup and reports missing, malformed,
or unsafe values. See [Environment configuration](docs/environments.md) for
the supported profiles and platform-specific URLs.

## Start the app

Start the Expo development server:

```bash
npm start
```

Launch a configured Android emulator:

```bash
npm run android
```

Launch an iOS simulator on macOS:

```bash
npm run ios
```

## Quality checks

Run all required local checks before opening a pull request:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test -- --runInBand
npx expo config --type public
```

To format supported files:

```bash
npm run format
```

Tests belong outside `app/` because every file under `app/` is interpreted as
an Expo Router route.

## Continuous integration

GitHub Actions runs the required formatting, linting, TypeScript, and test
checks for every pull request and for pushes to `main`. CI installs the exact
versions in `package-lock.json` with `npm ci` and uses the Node version pinned
in `.nvmrc`.

## Project structure

```text
app/                 Expo Router layouts and route entry points
src/components/      Shared, product-neutral UI components
src/config/          Validated public application configuration
src/utils/           Small, product-neutral utility functions
test/                Tests and shared Jest setup
docs/                Contributor and architecture documentation
Context/             Approved foundation planning documents
```

Route files should remain small. Business logic, API calls, storage, and other
external integrations will be introduced in separately reviewed feature or
foundation pull requests.
