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
import { Button, Card, CardContent } from '@wireweave/ui';
import '@wireweave/ui/styles';

export function Example() {
  return (
    <Card>
      <CardContent>
        <Button variant="primary">Get started</Button>
      </CardContent>
    </Card>
  );
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
