---
paths:
  - 'src/index.ts'
  - 'src/server.ts'
  - 'src/spec.ts'
---

# 공개 API 계약

`@wireweave/ui` 는 dashboard / admin / 기타 wireweave 도구의 디자인시스템 단일 소스.

## entry 구조

| Subpath                | 용도                          | 환경                      |
| ---------------------- | ----------------------------- | ------------------------- |
| `@wireweave/ui`        | 메인 컴포넌트 + 훅            | `'use client'` (브라우저) |
| `@wireweave/ui/server` | SSR-safe 유틸리티             | server / client 양쪽      |
| `@wireweave/ui/spec`   | specification 메타포 컴포넌트 | `'use client'`            |
| `@wireweave/ui/styles` | 번들 CSS (`ui.css`)           | static asset              |

## stable export — `@wireweave/ui`

### 컴포넌트

기본 컴포넌트는 다음 카테고리:

- 기본: `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Slider`, `Label`
- 컨테이너: `Card`, `Sheet`, `Dialog`, `AlertDialog`, `Popover`, `Tooltip`, `HoverCard`
- 네비: `Sidebar*`, `Tabs`, `NavigationMenu`, `Breadcrumb`, `Pagination`
- 표시: `Avatar`, `Badge`, `Alert`, `Toast`, `Progress`, `Skeleton`
- 폼: `Form*` (React Hook Form 통합)
- 테마: `ThemeProvider`, `ThemeToggle`, `useTheme`

### 훅

- `useTheme()` — 테마 관련
- `useToast()` — toast 호출
- 그 외 컴포넌트별 훅 (예: `useSidebar()`)

### 유틸

- `cn(...)` — `tailwind-merge` + `clsx` 합성

## stable export — `@wireweave/ui/server`

- `getThemeInitScript(storageKey?: string): string` — SSR FOUC 방지
- 그 외 server-safe 유틸 (예: cookie 기반 초기 테마 결정)

## 새 컴포넌트 추가 절차

1. `src/components/<name>.tsx` 작성 (`radix-cva.md` 패턴)
2. `src/index.ts` 에 export
3. `src/stories/<Name>.stories.tsx` 추가 (`storybook.md` 패턴)
4. 라이트 / 다크 양쪽 시각 검증
5. 사용 예제는 dashboard 또는 docs 의 `wireweave/docs/` 에 (선택)

## BREAKING 변경

다음은 BREAKING:

- 기존 컴포넌트의 props rename / 제거
- variant / size 옵션 제거
- default 값 변경
- 컴포넌트 자체 제거 / rename
- entry subpath 변경 (예: `@wireweave/ui/server` 의 export 제거)

다음은 minor:

- 새 컴포넌트 / variant / size / prop (옵셔널) 추가
- 새 시맨틱 토큰 추가 (기존 토큰 변경은 minor 또는 major — 외형 변경 정도에 따라)
- 새 entry subpath 추가

다음은 patch:

- 시각 회귀 (의도된 토큰 미세 조정 외에는 patch 로 처리하지 말 것)
- 버그 수정
- 내부 리팩터

## 의존자

- `dashboard` (Next.js) — `@wireweave/ui` 메인 + `/server` + `/styles`
- `admin` (Next.js) — 동일
- `docs` (VitePress) — `/styles` (테마 컴포넌트 없으면 메인은 미사용)
- `wireweave/examples` (선택)

## 의존자 영향 평가

`@wireweave/ui` 는 dashboard / admin 의 모든 페이지가 의존. BREAKING 시:

- 시각 회귀 검증 (스크린샷 또는 수동)
- dashboard / admin 의 사용처 일괄 grep
- 새 버전 publish → 의존자 PR 에서 `@wireweave/ui` 버전 bump + 변경 코드

## 디자인 결정 단일 출처

새 토큰 / 컴포넌트 / variant 의 디자인은 이 패키지에서 결정. dashboard / admin 이 자체 토큰 / 컴포넌트를 만들면 single source 원칙 위반.

dashboard / admin 이 패키지에 없는 컴포넌트가 필요하면:

1. 일회성이면 host 앱에 inline 구현 (단, `@wireweave/ui` 의 기본 컴포넌트 위에)
2. 두 호스트가 모두 필요로 하면 `@wireweave/ui` 에 추가
