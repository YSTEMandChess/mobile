# Mobile design system (this is more something to follow as a base, don't have to allgin directyl)

PR F4 establishes the reusable visual foundation for the mobile app. It is
based on the approved Figma direction and the current website implementation,
but it does not copy desktop layouts into the mobile app.

## Brand sources

The current website provides the initial color palette:

- primary green: `#7FCC26`
- secondary green: `#BFD99E`
- soft green background: `#E5F3D2`
- yellow accent: `#EAD94C`
- dark ink: `#1F1F1F`
- error red: `#D64545`

All product code must use semantic values from `src/design/theme.ts` or shared
values from `src/design/tokens.ts`. Do not add unexplained color, spacing,
radius, or typography literals to feature components.

The website uses Lato. F4 records a compatible type scale and weight system but
continues using native system fonts.

## Color scheme

The initial app intentionally supports a light color scheme only. The website
and current Figma direction do not define a complete approved dark palette.
The app uses a dark status bar and does not automatically switch component
colors when the device enters dark mode.

Dark mode should be introduced only with approved colors, contrast checks, and
visual tests rather than inferred by inverting the light palette.

## Primitives

- `Screen` provides safe-area handling, consistent content width and padding,
  and plain, soft, or patterned backgrounds.
- `AppText` provides display, title, heading, body, strong-body, label, and
  caption variants without disabling system text scaling.
- `Button` provides primary, brand, and secondary treatments, a minimum
  48-point touch target, disabled state, and loading state.
- `Spinner` announces a configurable loading label.
- `InlineError` announces an assertive, high-contrast error message.
- `ConnectionBanner` announces connecting, offline, and restored states.

The patterned `Screen` background is decorative and hidden from assistive
technology. It should be used for simple branded surfaces such as entry,
placeholder, empty, or celebration screens. Dense lessons, forms, chessboards,
and data-heavy screens should normally use the plain or soft background.

The patterned background uses the `chess-piece-pattern.png` asset
from the current website. It is rendered behind the same `Screen` API so feature screens do
not need to manage the image directly.

## Accessibility rules

- Body text starts at 16 points and remains scalable.
- Interactive controls use at least a 48-point touch target.
- Green buttons use dark text; white text on the brand green does not provide
  sufficient contrast.
- Headings expose the `header` accessibility role.
- Loading, error, and connectivity feedback provide screen-reader labels or
  live-region announcements.
- Decorative pattern content is excluded from the accessibility tree.
