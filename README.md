<h1 align="center">@wireweave/ui</h1>

<p align="center">React component design system for the Wireweave product line.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@wireweave/ui"><img src="https://img.shields.io/npm/v/@wireweave/ui?label=npm" alt="npm"></a>
  <a href="https://github.com/wireweave/ui/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT"></a>
</p>

## Installation

```bash
npm install @wireweave/ui
# or
pnpm add @wireweave/ui
```

Peer dependencies: `react@^19`, `react-dom@^19`, `tailwindcss@^4`.

## Usage

```tsx
import { Button, Card, CardContent } from '@wireweave/ui'
import '@wireweave/ui/styles'

export function Example() {
  return (
    <Card>
      <CardContent>
        <Button variant="primary">Get started</Button>
      </CardContent>
    </Card>
  )
}
```

## Theming

The package ships a single source of truth for the Wireweave design system tokens.
Light theme is the default; dark theme activates when the `.dark` class is present
on a parent element (or via `prefers-color-scheme: dark`).

```tsx
<html className={isDark ? 'dark' : ''}>
  <body>{/* … */}</body>
</html>
```

Semantic tokens (`--color-foreground`, `--color-background`, `--color-muted`, …) are
defined in the package's `@theme` block and overridden under `.dark`. Consumers must
not hardcode hex values; reference tokens via Tailwind arbitrary values such as
`bg-[var(--color-paper-1)]` or via the documented utility classes.

## Consuming in a Vite / Tauri (CSR, non-SSR) app

The theme system is client-side-rendering friendly — `ThemeProvider` performs all
browser access (`localStorage`, `matchMedia`, `document`) inside effects, so no SSR
runtime is required.

**1. Styles.** Import the prebuilt CSS once at the app entry (bundles Tailwind base +
all component utilities + the `@theme` tokens):

```ts
// main.tsx
import '@wireweave/ui/styles.css'
```

**2. Tailwind v4 token utilities (only if the host writes its own `bg-[var(--color-…)]`
markup).** Point your app's Tailwind entry at the raw token source and scan the package
so semantic utilities (`text-muted-foreground`, `bg-card`, …) are generated:

```css
/* app.css */
@import 'tailwindcss';
@import '@wireweave/ui/styles/theme'; /* raw @theme tokens (palette + semantic + .dark) */
@source '../node_modules/@wireweave/ui/dist'; /* scan built component classes */
```

If the host only renders `@wireweave/ui` components (no custom token utilities of its
own), step 1 alone is sufficient — the component classes are already baked into `ui.css`.

**3. Theme provider.** Wrap the app; dark mode toggles the `.dark` class on `<html>`:

```tsx
import { ThemeProvider } from '@wireweave/ui'

createRoot(el).render(
  <ThemeProvider defaultTheme="system">
    <App />
  </ThemeProvider>,
)
```

**4. Zero-FOUC (optional).** CSR shows one initial frame in the default theme before the
provider effect runs. To apply the stored theme before React mounts, inline the init
script in `index.html` (it is DOM-only and safe to call in the browser):

```ts
// main.tsx, before createRoot()
import { getThemeInitScript } from '@wireweave/ui/server'
// eslint-disable-next-line no-eval
;(0, eval)(getThemeInitScript())
```

or paste the equivalent IIFE into a `<script>` in the HTML `<head>`.

## Storybook

Browse all components, variants, and dark/light token previews at
[ui.wireweave.org](https://ui.wireweave.org).

```bash
pnpm storybook        # local dev (port 6006)
pnpm build-storybook  # static build
```

## Releases

This package follows the same release flow as `@wireweave/core`:

- `develop` branch → `--tag beta` (preRelease)
- `main` branch → `--tag latest`
- Conventional commits + `release-it` + npm provenance via Trusted Publishing.

## License

MIT © Wireweave
