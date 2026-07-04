---
paths:
  - 'src/components/theme.tsx'
  - 'src/server.ts'
---

# 테마 시스템

다크 / 라이트 / system 3-mode. `html` 요소의 class (`light` / `dark`) 가 단일 진실 공급원.

## 구성 요소

| 심볼                   | entry                  | 역할                                         |
| ---------------------- | ---------------------- | -------------------------------------------- |
| `<ThemeProvider>`      | `@wireweave/ui`        | 컨텍스트 + storage 동기화 + system 모드 감지 |
| `<ThemeToggle>`        | `@wireweave/ui`        | UI 토글 (2-way / 3-way)                      |
| `useTheme()`           | `@wireweave/ui`        | 훅 (`theme`, `resolvedTheme`, `setTheme`)    |
| `getThemeInitScript()` | `@wireweave/ui/server` | SSR FOUC 방지 inline script                  |

## ThemeProvider

```tsx
<ThemeProvider defaultTheme="system" storageKey="wireweave-theme">
  {children}
</ThemeProvider>
```

- `defaultTheme`: `'light' | 'dark' | 'system'` (기본 `'system'`). localStorage 가 우선.
- `storageKey`: 영속 키 (기본 `'wireweave-theme'`).
- `system` 모드일 때 OS `prefers-color-scheme` 변경에 자동 반응.
- SSR 안전: 초기 렌더는 `system` 가정, mount 직후 storage 와 동기화.

## SSR 통합 (Next.js)

```tsx
// app/layout.tsx
import { getThemeInitScript } from '@wireweave/ui/server'
import { ThemeProvider } from '@wireweave/ui'

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />
      </head>
      <body>
        <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

- `<html>` 에 `suppressHydrationWarning` 필수 (init script 가 class 를 추가하므로 hydration 비교에서 오탐).
- `getThemeInitScript()` 는 server entry 에서만 import (메인 entry 는 `'use client'` 라 RSC 에서 호출 불가).
- storage key 커스텀 시 `getThemeInitScript('my-key')` + `<ThemeProvider storageKey="my-key">` 동시.

## entry 분리 이유

- `@wireweave/ui` 메인 entry: 모든 청크에 `'use client'` banner 자동 삽입 (vite library build) — RSC 에서 호출 불가
- `@wireweave/ui/server`: server-safe 유틸. `getThemeInitScript()` 같은 SSR 호출 가능 함수
- `@wireweave/ui/spec`: specification 메타포 컴포넌트 (별도 도메인)
- `@wireweave/ui/styles`: 번들된 CSS (`dist/ui.css`)

## host 앱 토글 패턴

```tsx
// 헤더에서
import { ThemeToggle } from '@wireweave/ui'
<ThemeToggle />              {/* light ↔ dark 2-way */}
<ThemeToggle withSystem />   {/* light → dark → system 3-way */}
<ThemeToggle size="sm" />    {/* 'sm' | 'md' (기본 'md') */}
```

자체 토글 UI 가 필요한 경우 `useTheme()`:

```tsx
const { theme, resolvedTheme, setTheme } = useTheme()

<button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
  {resolvedTheme}
</button>
```

`theme` (사용자 선택값) vs `resolvedTheme` (실제 적용 테마) 구분 — `system` 일 때 둘이 다르다.

## 금지

- `.dark` 클래스를 직접 토글 (storage 와 어긋남)
- `prefers-color-scheme` 미디어 쿼리만으로 토글 구현 (사용자 선택 무시)
- `<ThemeToggle>` 을 `<ThemeProvider>` 밖에 두는 것 (컨텍스트 없음 에러)

## 관련 토큰

`design-tokens.md` 참조. 시맨틱 토큰은 `.dark` 에서 자동으로 다크 매핑으로 전환.
