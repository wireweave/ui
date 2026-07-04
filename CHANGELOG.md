# Changelog

## [0.5.0-beta.0](https://github.com/wireweave/ui/compare/v0.4.1-beta.0...v0.5.0-beta.0) (2026-07-04)

### Features

- **canvas:** add canvas frame and grid components ([1f9da69](https://github.com/wireweave/ui/commit/1f9da69d323f264e9224e3575d9e4ff9e541ce70))
- **canvas:** add canvas primitives public API ([a231ab6](https://github.com/wireweave/ui/commit/a231ab6ff29cb58032d47a11b890df6727461794))
- **canvas:** add CanvasControls component ([4cb4b9a](https://github.com/wireweave/ui/commit/4cb4b9a72c590edfb5bb6add8fc2642e9e93ba80))
- **canvas:** add CanvasViewport component ([45c22ce](https://github.com/wireweave/ui/commit/45c22ce032e933edcf802be2fffc44f50ead7ad9))
- **components:** add InterviewPanel and refine Dialog/Skeleton formatting ([e6be591](https://github.com/wireweave/ui/commit/e6be5919d1727147a86b94bd898aea4240d009f4))
- **components:** add NodeDetailPanel component ([ff60c94](https://github.com/wireweave/ui/commit/ff60c9434c630491d49c31f1306d53d0986da12b))
- **components:** add NodeDetailPanel story and apply code formatting ([7c6848f](https://github.com/wireweave/ui/commit/7c6848f0b9cbd69ef6d7a85d49053ef2cc755853))
- **fixtures:** add sample SSOT graph data fixture ([32006d5](https://github.com/wireweave/ui/commit/32006d5f1a7d2b02bc7ba4d11aa11cb6e492f5a1))
- **graph:** add 2D SSOT graph component ([dbe565c](https://github.com/wireweave/ui/commit/dbe565c31c99ee0c683048e826460cf04865ed34))
- **graph:** add 3D SSOT graph component ([2e929c8](https://github.com/wireweave/ui/commit/2e929c84b7129f7467772f17fb0bd0f675cf91fb))
- **graph:** add d3-force-3d type declarations ([e4f02c5](https://github.com/wireweave/ui/commit/e4f02c5ab04071d2ea8bceb13b7599059dcd24ca))
- **graph:** add graph module exports ([0a17f48](https://github.com/wireweave/ui/commit/0a17f4842eb9a607ab068bc327d3c7ef069249a3))
- **graph:** add kind-tokens semantic mapping ([b65180f](https://github.com/wireweave/ui/commit/b65180fddeab00636895a719faaed914757f687e))
- **graph:** add semantic color resolution hook ([6fc8f43](https://github.com/wireweave/ui/commit/6fc8f43bedf53a4428003a2bd24577a71518ee48))
- **graph:** add SSOT graph 2D/3D stories with lazy loading ([25d4fb7](https://github.com/wireweave/ui/commit/25d4fb7ea21a2a262d48247b22fca25d5cb29584))
- **graph:** add SSOT graph type definitions ([cedd449](https://github.com/wireweave/ui/commit/cedd449bdda8668b2e35b9ed71aeb4bd8ede2196))
- **graph:** add SsotGraphView stories ([03a3787](https://github.com/wireweave/ui/commit/03a3787bc925fa7db488e9cf833cbf94c497d212))
- **graph:** add SsotGraphView with 3D/2D toggle ([de21ece](https://github.com/wireweave/ui/commit/de21ece759f87874e0e756a1e16946fb21fa1347))
- **graph:** add troika-three-text type declarations ([64bdca8](https://github.com/wireweave/ui/commit/64bdca882c34176b32d62d3f8ef0e89b72035546))
- **stories:** add InterviewPanel stories with variants ([b826921](https://github.com/wireweave/ui/commit/b8269217f13497a768171bc88198af945c0fbf29))

### Refactoring

- **storybook:** extract theme decorator into component ([1cc73ad](https://github.com/wireweave/ui/commit/1cc73ad1954fe1fc5ac58a99375882b94f44bf5b))

### Documentation

- add Claude rules for public API, design tokens, and Storybook ([9e43d53](https://github.com/wireweave/ui/commit/9e43d53b5b49f8db5e50fd233fa0c1d4e613e684))
- **changelog:** format bullet points consistently ([9b77702](https://github.com/wireweave/ui/commit/9b777026b2d756048fa87561090d5247d5d3987f))
- **readme:** apply Prettier formatting to code examples ([12d8e97](https://github.com/wireweave/ui/commit/12d8e97d559382ac934df7108cb244451f05eac6))
- **rules:** add Radix CVA component guidelines ([26c5ab7](https://github.com/wireweave/ui/commit/26c5ab78fb3d193a89f294c70c30d340a252e4e8))
- **theming:** add theme system documentation and update configs ([0cb914c](https://github.com/wireweave/ui/commit/0cb914cfc8c6fa769af0867499f72d9c2ab0012e))

## [0.4.1-beta.0](https://github.com/wireweave/ui/compare/v0.4.0...v0.4.1-beta.0) (2026-05-29)

## [0.4.0](https://github.com/wireweave/ui/compare/v0.4.0-beta.0...v0.4.0) (2026-05-01)

## 0.4.0-beta.0 (2026-05-01)

### Features

- add ./styles/theme sub-export (theme.css source) ([ae2700c](https://github.com/wireweave/ui/commit/ae2700cebfa3478b737cefc2a98f59f53e42b0d5))
- **storybook:** add theme system stories and update sidebar examples ([54b91f3](https://github.com/wireweave/ui/commit/54b91f3bf51d57e04a39adab381d62c6903aadec))
- **theme:** implement theme system with SSR-safe init script ([a474df6](https://github.com/wireweave/ui/commit/a474df6d0d3a115dad286587bcb7f4fd1553fbb9))

### Refactoring

- **sidebar:** apply inverted tone system with semantic tokens ([ab79cb3](https://github.com/wireweave/ui/commit/ab79cb30117ac8095da6c5c17fb502a31171ae90))

### Documentation

- **ui:** add sidebar token system and theme API documentation ([6793758](https://github.com/wireweave/ui/commit/67937588fad77103e3efce362cd35bac1d614843))

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
