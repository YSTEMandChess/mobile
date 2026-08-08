# Repository Boundaries

This workspace contains three repositories:

- `../YSTEM-Website`: read-only reference
- `../YSC-Mobile-Application`: read-only reference
- this repository (`mobile`): the only writable project

Do not edit, install dependencies in, format, commit, or push changes to
`../YSTEM-Website` or `../YSC-Mobile-Application`.

Use those repositories only to inspect existing APIs, behavior, assets, and
architecture.

# Current Goal

Build the new Y STEM and Chess mobile application using a fresh Expo/React
Native TypeScript foundation.

The old TritonSE app is a reference only and must not be copied wholesale.

# Current Non-Goals

Do not implement real authentication, lessons, puzzles, chess, Socket.IO,
multiplayer, gamification, or the personal development bot unless explicitly
included in the current task.

# Working Rules

- Explain the plan before editing.
- Modify files only inside this repository.
- Work in small, reviewable scopes.
- Do not commit or push unless explicitly requested.
- Run linting, type checks, and tests after implementation.
