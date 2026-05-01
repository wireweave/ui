# @wireweave/ui

Wireweave 디자인시스템 단일 소스. dashboard / admin / 기타 wireweave 도구가 모두 이 패키지에 의존한다.

## 디자인시스템 개요

**Wireweave UI** — slate 그레이 + blue 시그니처 기반의 모던 product UI.

- 라이트/다크 듀얼 테마
- 둥근 모서리 (4~16px), shadow 사용, 명확한 시각 위계
- 전 컴포넌트 Radix UI primitives 위에 CVA + Tailwind v4 로 빌드

## 토큰 시스템

### 2-tier 구조 (`src/styles/theme.css`)

1. **팔레트 변수 (고정값)** — `--color-slate-{50..950}`, `--color-blue-{50..900}`, `--color-green-…`, `--color-red-…`, `--color-yellow-…`, `--color-purple-…`, `--color-orange-…`, `--color-white`, `--color-black`
2. **시맨틱 변수 (팔레트 참조)** — 컴포넌트가 사용하는 의미 기반 토큰

| 시맨틱 토큰 | 라이트 매핑 | 용도 |
|------------|-----------|------|
| `--color-background` | `slate-50` | 페이지 배경 |
| `--color-foreground` | `slate-900` | 본문 텍스트 |
| `--color-card` | `white` | 카드/패널 배경 |
| `--color-primary` | `blue-500` | CTA, 시그니처 |
| `--color-primary-hover` | `blue-600` | primary hover |
| `--color-secondary` | `slate-100` | 보조 버튼 |
| `--color-muted` | `slate-100` | 비활성/배경 강조 |
| `--color-muted-foreground` | `slate-500` | 부가 텍스트 |
| `--color-destructive` | `red-500` | 위험 액션 |
| `--color-success` | `green-500` | 성공 시그널 |
| `--color-warning` | `yellow-500` | 경고 시그널 |
| `--color-border` | `slate-200` | 구분선 |
| `--color-input` | `slate-200` | 입력 보더 |
| `--color-ring` | `blue-500` | focus 링 |

### Sidebar 토큰 (페이지 배경 ↔ 사이드바 인버전)

`Sidebar` 는 페이지 배경과 항상 **반대 톤**을 유지한다. 라이트 페이지에서는 어두운 사이드바, 다크 페이지에서는 밝은 사이드바. 모든 사이드바 색은 다음 토큰을 통해서만 적용한다 — 컴포넌트 내부에서 팔레트 변수, hex, Tailwind 팔레트 utility 직접 사용 금지.

| 시맨틱 토큰 | 라이트 매핑 | 다크 매핑 (인버전) | 용도 |
|------------|-----------|-------------------|------|
| `--color-sidebar` | `slate-800` | `slate-100` | 사이드바 배경 |
| `--color-sidebar-hover` | `slate-700` | `slate-200` | 아이템 hover bg |
| `--color-sidebar-foreground` | `slate-50` | `slate-900` | 메인 텍스트 |
| `--color-sidebar-foreground-muted` | `slate-400` | `slate-500` | 섹션 타이틀 / 서브텍스트 |
| `--color-sidebar-active` | `blue-500 @ 20%` | `blue-500 @ 18%` | 활성 아이템 bg (color-mix) |
| `--color-sidebar-active-foreground` | `white` | `blue-700` | 활성 아이템 텍스트 |
| `--color-sidebar-border` | `slate-700` | `slate-300` | 구분선 (사이드바 내부) |
| `--color-sidebar-overlay` | `slate-900 @ 75%` | `slate-900 @ 60%` | 모바일 사이드바 backdrop |
| `--color-sidebar-logo-from` | `blue-500` | `blue-500` | 로고 그라디언트 시작 |
| `--color-sidebar-logo-to` | `violet-500` | `violet-500` | 로고 그라디언트 끝 |

> 알파 값은 `color-mix(in oklab, var(--color-blue-500) 20%, transparent)` 패턴으로 표현 — Tailwind `/N` 문법은 `var()` 와 함께 동작하지 않는다.

## 다크테마 규칙

다크 모드는 `.dark` 클래스가 부모에 붙거나 `prefers-color-scheme: dark` 일 때 활성.

```css
@theme {
  /* light */
  --color-background: var(--color-slate-50);
  --color-foreground: var(--color-slate-900);
}

.dark {
  /* dark — 시맨틱 변수만 오버라이드, 팔레트 변수는 건드리지 않음 */
  --color-background: var(--color-slate-950);
  --color-foreground: var(--color-slate-50);
  /* … */
}
```

### 다크 토큰 작성 원칙

- **시맨틱 변수만 `.dark` 에서 오버라이드**, 팔레트는 라이트/다크 공통 (값 자체는 변하지 않음)
- 시맨틱 변수에 hex 직접 사용 금지 — 반드시 팔레트 변수 참조
- 대비비 검증: 본문 텍스트 4.5:1 이상 (WCAG AA), 비텍스트 UI 3:1 이상
- shadow / border 토큰도 라이트/다크 양쪽에 정의

## 컴포넌트 스타일링 규칙

- CVA + `tailwind-merge` + `clsx` (`src/lib/utils.ts` 의 `cn`)
- Tailwind arbitrary 값으로 시맨틱 토큰 참조: `bg-[var(--color-background)]`, `border-[var(--color-border)]`
- 인라인 style 금지, 하드코딩 hex 금지
- forwardRef + displayName 패턴 (모든 export 컴포넌트)
- `*Props` 타입은 `extends VariantProps<…> & React.HTMLAttributes<…>` 패턴

## 컴포넌트 추가 절차

1. Radix UI primitive 가 있으면 그 위에 빌드 (a11y 자동)
2. CVA variant 정의 — variants/sizes/states
3. 모든 색은 시맨틱 토큰 참조
4. 라이트/다크 양쪽 시각 검증 (Storybook)
5. `src/index.ts` 에 export 추가
6. `src/stories/<Component>.stories.tsx` 추가 (variants/sizes/states 한 화면)

## sub-export

- `@wireweave/ui` — 메인 컴포넌트 (`'use client'`, React 컴포넌트 + 훅)
- `@wireweave/ui/server` — server-safe 유틸리티 (`getThemeInitScript` 등 SSR 에서 호출 가능)
- `@wireweave/ui/spec` — specification 메타포 컴포넌트
- `@wireweave/ui/styles` — `dist/ui.css` (번들된 CSS)

> 클라이언트 컴포넌트와 server-only 유틸리티는 별도 entry 로 분리한다. 메인 entry 의 모든 청크에는 vite build 가 `'use client'` banner 를 자동 삽입하므로, SSR 에서 호출되어야 하는 함수는 `./server` entry 에 둔다.

## 테마 시스템 API

`src/components/theme.tsx` 가 host 앱에서 다크 모드를 제어하는 단일 진입점을 제공한다. 단일 진실 공급원은 `html` 요소의 class (`light` / `dark`).

### `<ThemeProvider>`

```tsx
import { ThemeProvider } from '@wireweave/ui';

<ThemeProvider defaultTheme="system" storageKey="wireweave-theme">
  {children}
</ThemeProvider>
```

- `defaultTheme`: `'light' | 'dark' | 'system'` (기본 `'system'`). localStorage 가 우선.
- `storageKey`: 영속 키 (기본 `'wireweave-theme'`).
- `system` 모드일 때 OS `prefers-color-scheme` 변경에 자동 반응.
- SSR 안전: 초기 렌더는 `system` 가정. mount 직후 storage 와 동기화.

### `useTheme()`

```ts
const { theme, resolvedTheme, setTheme } = useTheme();
// theme: 'light' | 'dark' | 'system' (사용자 선택값)
// resolvedTheme: 'light' | 'dark' (실제 적용 테마)
// setTheme(next): 변경 + localStorage 저장 + html class 갱신
```

### `<ThemeToggle>`

```tsx
import { ThemeToggle } from '@wireweave/ui';

<ThemeToggle />              {/* 2-way: light ↔ dark */}
<ThemeToggle withSystem />   {/* 3-way: light → dark → system → … */}
<ThemeToggle size="sm" />    {/* 'sm' | 'md' (기본 'md') */}
```

`<ThemeProvider>` 내부에서만 동작.

### `getThemeInitScript()` — FOUC 방지

Next.js 같은 SSR 환경에서 hydration 전에 html class 를 적용하려면 head 에 inline script 를 박는다. **server entry 에서 import 한다** — `@wireweave/ui` 메인 entry 는 `'use client'` 라 RSC 환경에서 호출 불가.

```tsx
import { getThemeInitScript } from '@wireweave/ui/server';

<head>
  <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />
</head>
```

storage key 를 커스텀했으면 `getThemeInitScript('my-key')` 로 동일하게 전달한다.

## 빌드 & 테스트

```bash
pnpm install
pnpm build           # vite library build (ESM + CJS + d.ts + CSS)
pnpm type-check      # tsc --noEmit
pnpm storybook       # 6006 포트 dev
pnpm build-storybook # 정적 빌드 (ui.wireweave.org 호스팅용)
```

## 릴리스

- `develop` 푸시 → `--tag beta` 자동 publish (release-it preRelease)
- `main` 푸시 → `--tag latest` 자동 publish
- npm Trusted Publisher (OIDC + provenance), 토큰 secret 미사용
