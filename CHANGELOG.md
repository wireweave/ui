# Changelog

## 0.4.0-beta.0 (2026-05-01)

### Features

* add ./styles/theme sub-export (theme.css source) ([ae2700c](https://github.com/wireweave/ui/commit/ae2700cebfa3478b737cefc2a98f59f53e42b0d5))
* **storybook:** add theme system stories and update sidebar examples ([54b91f3](https://github.com/wireweave/ui/commit/54b91f3bf51d57e04a39adab381d62c6903aadec))
* **theme:** implement theme system with SSR-safe init script ([a474df6](https://github.com/wireweave/ui/commit/a474df6d0d3a115dad286587bcb7f4fd1553fbb9))

### Refactoring

* **sidebar:** apply inverted tone system with semantic tokens ([ab79cb3](https://github.com/wireweave/ui/commit/ab79cb30117ac8095da6c5c17fb502a31171ae90))

### Documentation

* **ui:** add sidebar token system and theme API documentation ([6793758](https://github.com/wireweave/ui/commit/67937588fad77103e3efce362cd35bac1d614843))

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
