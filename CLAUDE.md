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

- `@wireweave/ui` — 메인 컴포넌트
- `@wireweave/ui/styles` — `dist/ui.css` (번들된 CSS)

추후 `/spec` (specification 메타포 컴포넌트) 같은 sub-export 가 추가되면 README + 본 문서에 명시.

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
