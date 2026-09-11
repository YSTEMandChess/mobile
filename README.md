# Y STEM and Chess Mobile

This repository contains the new Y STEM and Chess mobile application. It is a
fresh Expo SDK 57 and React Native TypeScript project that uses the previous
TritonSE application as a reference.

## What you'll need

Before installing the project dependencies:

- Node.js 24 LTS. The repository pins Node `24.18.0` in `.nvmrc`.
- npm 11.

Before launching the application, you will also need one development platform:

- **Windows:** Android Studio and an Android emulator.
- **macOS:** Xcode and an iOS simulator, or Android Studio and an Android
  emulator.

You do not need to have an emulator or simulator configured before continuing
through the installation steps. Complete the dependency and environment setup
below, then follow the
[emulator and simulator setup guide](docs/local-development.md) before launching
the application. You only need one platform working to get started.

Install the pinned Node version using [Node.js downloads](https://nodejs.org/en/download)
or a version manager. On macOS or Linux with `nvm`, run the following from
the repository root:

```bash
nvm install
nvm use
```

On Windows with [nvm-windows](https://github.com/coreybutler/nvm-windows),
select the version explicitly:

```powershell
nvm install 24.18.0
nvm use 24.18.0
```

Reopen your terminal after installation and check `node --version` and
`npm --version`. Expect Node `v24.18.0` and npm `11.x`. Expo CLI is included
with the project dependencies; no global Expo CLI installation is needed.

## Install

Get the mobile repository URL and access from the project maintainer, then
clone it and open its root folder in your editor. This is the folder containing
`package.json`, `.nvmrc`, and this README.

Run the following and all remaining project commands from that root folder:

```bash
npm ci
```

The committed `package-lock.json` is the source of truth for dependency
versions.

## Configure the environment

Copy the example environment file before starting the app, unless you already
have a `.env.local` file. On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

On macOS or Linux:

```bash
cp .env.example .env.local
```

The example targets a backend on the development computer from an Android
emulator. Update the API URL for a different platform or environment. The app
validates its public configuration at startup and reports missing, malformed,
or unsafe values. See [Environment configuration](docs/environments.md) for
the supported profiles and platform-specific URLs. Restart Expo after changing
the environment. Keep `.env.local` untracked and do not put secrets in public
Expo variables.

The current app uses mock sessions and placeholder screens, so a running
backend is not required to try navigation. Valid configuration is still
required at startup. Obtain the approved backend setup or endpoint from the
maintainer when working on API integration.

## Start the app

Start your virtual device using the
[emulator and simulator guide](docs/local-development.md), then choose one
launch command.

For Android:

```bash
npm run android
```

For iOS on macOS:

```bash
npm run ios
```

Each command starts Expo and opens the app. Alternatively, run `npm start`
and press `a` for Android or `i` for iOS in that terminal. If Expo is already
running, use those keys instead of starting another server. Keep the terminal
open while developing; press `Ctrl+C` to stop.

### Verify your first run

The app should open to **Sign in**, with **Continue as student** and
**Continue as mentor** buttons. Choose student to see the **Home**, **Learn**,
**Play**, and **Profile** tabs. Use **Sign out** in Profile, then choose mentor
to see the mentor placeholder screen.

These are temporary mock roles; no account credentials are needed. Real
authentication, lessons, and gameplay are still pending.

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
src/assets/          Mobile images and other bundled visual assets
src/components/ui/   Shared, product-neutral UI components
src/components/feedback/  Reusable error and connection feedback
src/config/          Validated public application configuration
src/design/          Brand tokens and the semantic light theme
src/types/           Shared TypeScript declarations
src/utils/           Small, product-neutral utility functions
test/                Tests and shared Jest setup
docs/                Contributor and architecture documentation
Context/             Approved foundation planning documents
AGENTS.md            Repository boundaries and contributor working rules
```

Route files should remain small. Business logic, API calls, storage, and other
external integrations will be introduced in separately reviewed feature or
foundation pull requests.

The reusable colors, typography, surfaces, buttons, loading, and feedback
components are documented in the [mobile design system](docs/design-system.md).
