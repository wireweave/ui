---
paths:
  - 'src/components/**'
  - 'src/lib/**'
---

# Radix + CVA + Tailwind v4 — 컴포넌트 작성 규칙

`@wireweave/ui` 의 모든 컴포넌트는 동일 패턴.

## 빌드 블록

| 레이어        | 도구                                  | 책임                                  |
| ------------- | ------------------------------------- | ------------------------------------- |
| 동작 / 접근성 | Radix UI primitives                   | a11y / 키보드 / focus 트랩 / portal   |
| variant 표현  | `class-variance-authority` (CVA)      | size / variant / state 의 클래스 매핑 |
| 클래스 합성   | `tailwind-merge` + `clsx` (`cn` util) | 사용자 className 과 안전 병합         |
| 스타일        | Tailwind v4 + 시맨틱 토큰             | 색은 `var(--color-*)` 만              |

## 표준 컴포넌트 골격

```tsx
'use client'

import * as React from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const dialogContentVariants = cva(
  // base classes (모든 variant 공통)
  'fixed inset-0 z-50 grid place-items-center bg-[var(--color-overlay)]',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

export interface DialogContentProps
  extends
    React.ComponentPropsWithoutRef<typeof RadixDialog.Content>,
    VariantProps<typeof dialogContentVariants> {}

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  DialogContentProps
>(({ className, size, ...props }, ref) => (
  <RadixDialog.Content
    ref={ref}
    className={cn(dialogContentVariants({ size }), className)}
    {...props}
  />
))
DialogContent.displayName = 'DialogContent'
```

## 필수 패턴

- `forwardRef` + `displayName` (모든 export 컴포넌트)
- `extends React.ComponentPropsWithoutRef<typeof RadixPrimitive>` 로 props 상속
- `extends VariantProps<typeof <variants>>` 로 CVA variant 노출
- 외부 className 은 `cn(variants(...), className)` 로 마지막 합성

## 금지

- 인라인 `style={{ ... }}` (디자인 토큰 일관성 깨짐)
- 하드코딩 hex (`#3b82f6`) — 항상 `var(--color-blue-500)` 또는 시맨틱 토큰 경유
- Tailwind 팔레트 utility 직접 사용 (`bg-blue-500`) — 시맨틱 토큰 우선 (`bg-[var(--color-primary)]`)
- ref 필요한 컴포넌트에 forwardRef 미적용 (Radix slot / asChild 패턴 깨짐)

## 예외 — 팔레트 직접 사용이 정당화되는 경우

- 일회성 일러스트 / 로고 그라디언트
- variant prop 으로 노출되는 의도적 색상 선택지 (예: `<Badge color="green" />`)
- 시맨틱 토큰으로 표현이 부적절한 강조 색 (color-mix 패턴 사용 — admin/CLAUDE.md 참조)

## variant 디자인

CVA variant 는 호스트 앱 사용성 우선:

- `size`: `'sm' | 'md' | 'lg'` 표준. 컴포넌트마다 의미는 다를 수 있지만 이름은 통일.
- `variant`: `'default' | 'outline' | 'ghost' | 'destructive'` 등 의도 기반.
- `state` props 는 controlled prop 으로 (예: `checked`, `disabled`) — Radix 가 이미 제공하면 그대로.

## 신규 컴포넌트 추가 절차

1. Radix UI primitive 가 있으면 그 위에 빌드 (a11y 자동)
2. CVA variant 정의 (variants / sizes / states)
3. 모든 색은 시맨틱 토큰 참조
4. `src/index.ts` 에 export 추가
5. `src/stories/<Component>.stories.tsx` 추가 (variants / sizes / states 한 화면)
6. 라이트 / 다크 양쪽 시각 검증 (Storybook)
7. README 또는 `wireweave/docs/` 갱신 (선택)

## 테스트

- Storybook 이 1차 검증 도구. 모든 variant / size / state 가 한 페이지에 보여야 한다.
- 단위 테스트는 동작 검증에 한정 (커스텀 동작이 있을 때만).
- a11y 는 Radix 가 보장 — 직접 검증 불필요. 단, 커스텀 키보드 핸들러 추가 시 axe 검사.
