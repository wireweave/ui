---
paths:
  - 'src/styles/**'
  - 'src/components/**'
---

# 디자인 토큰

2-tier 구조. 컴포넌트는 시맨틱만 참조.

## 2-tier 구조

```
┌─────────────────────────────────────┐
│ Tier 1: 팔레트 변수 (라이트/다크 공통) │
│ --color-slate-{50..950}             │
│ --color-blue-{50..900}              │
│ --color-green/red/yellow/...        │
└─────────────────────────────────────┘
              ↑ var()
┌─────────────────────────────────────┐
│ Tier 2: 시맨틱 변수 (.dark 에서 오버) │
│ --color-background, --color-card    │
│ --color-primary, --color-border     │
│ --color-sidebar, --color-foreground │
└─────────────────────────────────────┘
              ↑ Tailwind 임의값
[컴포넌트] bg-[var(--color-primary)]
```

상세 토큰 목록은 `CLAUDE.md` 참조 (sidebar 토큰 / 시맨틱 토큰 표).

## 컴포넌트 작성 시 토큰 사용 규칙

- 컴포넌트 className 에서는 **시맨틱 토큰만** 참조
- 팔레트 토큰 직접 참조는 `theme.css` 의 시맨틱 정의 안에서만
- hex literal 컴파일 통과해도 리뷰에서 reject

```tsx
// 좋음
<div className="bg-[var(--color-card)] text-[var(--color-foreground)] border-[var(--color-border)]">

// 나쁨 — 팔레트 직접
<div className="bg-[var(--color-slate-50)]">

// 더 나쁨 — hex
<div className="bg-[#f8fafc]">

// 더 나쁨 — Tailwind 팔레트 (동적 클래스로 다크 모드 깨짐)
<div className="bg-slate-50">
```

## 새 토큰 추가 절차

1. `src/styles/theme.css` 에 정의 (라이트 + `.dark` 양쪽)
2. 팔레트 변수 참조 (hex 직접 정의 금지)
3. 라이트 / 다크 대비 검증 (WCAG AA: 본문 4.5:1, 비텍스트 3:1)
4. `CLAUDE.md` 의 토큰 표 갱신
5. 컴포넌트 / Storybook 양쪽에서 시각 검증
6. dashboard / admin / docs 의 globals.css 가 자동으로 받음 (이 패키지의 theme.css 가 single source)

## 알파 / mix 표현

Tailwind v4 의 `/N` 슬래시 문법은 `var()` 와 잘 맞지 않는다. 대신 `color-mix`:

```css
/* 좋음 */
background: color-mix(in oklab, var(--color-blue-500) 20%, transparent);

/* 안 됨 */
background: var(--color-blue-500) / 20%; /* invalid */
```

CSS 변수에 미리 mix 결과를 만들어 두는 것도 가능:

```css
@theme {
  --color-sidebar-active: color-mix(in oklab, var(--color-blue-500) 20%, transparent);
}
.dark {
  --color-sidebar-active: color-mix(in oklab, var(--color-blue-500) 18%, transparent);
}
```

## 컴포넌트 → 호스트 앱 토큰 흐름

```
ui/src/styles/theme.css  (single source)
    ↓ pnpm build (vite library)
dist/ui.css
    ↓ npm publish
@wireweave/ui/styles
    ↓ host import
dashboard/src/app/globals.css:
  @import "@wireweave/ui/styles/theme.css";
  @source "../../../node_modules/@wireweave/ui/dist";
```

호스트는 토큰을 다시 정의하지 않는다. 호스트별 추가 토큰이 필요하면 `--app-*` prefix 로 자기 globals.css 에서 정의하고 시맨틱 변수에 매핑.

## 다크 모드 토글

`@wireweave/ui` 의 `<ThemeProvider>` + `<ThemeToggle>` 사용. host 앱에서 `.dark` 클래스를 직접 토글하지 않는다 — `setTheme` 경유.

SSR 의 FOUC 방지: `getThemeInitScript()` 를 head 에 inline (server entry 에서 import).
