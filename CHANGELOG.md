# Changelog

## [0.2.1] - 2026-04-29

### Added
- `./styles/theme` sub-export exposing raw `theme.css` source so consumer apps can register `@theme` tokens with their own Tailwind v4 build (required for `bg-foreground`, `text-muted-foreground` 류 시맨틱 utility 생성).
- `src/styles/theme.css` 를 npm tarball `files` 에 포함.

## [0.2.0] - 2026-04-29

### Initial release

- Bootstrapped from the admin packages/ui codebase as the canonical Wireweave design system.
- 25 React components built on Radix UI primitives (Button, Card, Dialog, Sidebar, Tabs, etc.).
- Tailwind v4 token system with light theme; dark theme rolls out next.
- Vite library build with ESM + CJS + d.ts outputs and CSS bundle (`@wireweave/ui/styles`).
- Storybook 8 setup (full stories ship in a follow-up minor).
