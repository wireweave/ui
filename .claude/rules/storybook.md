---
paths:
  - 'src/stories/**'
---

# Storybook 작성 규칙

`pnpm storybook` 6006 포트. `pnpm build-storybook` 으로 정적 빌드 (ui.wireweave.org 호스팅).

## 패키지 / 스토리 단위

- 컴포넌트당 1 스토리 파일 (`<Component>.stories.tsx`)
- variant / size / state 는 한 페이지에 모두 가시화 — 사용자가 스크롤 한 번으로 전체 모양을 본다
- 인터랙션 시연용 스토리는 별도 (예: `Dialog.stories.tsx` 의 `Open`)

## 표준 스토리 구조

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}
export default meta
type Story = StoryObj<typeof Button>

// 1. variant 일람
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
}

// 2. size 일람
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

// 3. state 일람
export const States: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button data-state="loading">Loading</Button>
    </div>
  ),
}

// 4. 인터랙션 (선택)
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <PlusIcon /> Add
      </>
    ),
  },
}
```

## 라이트 / 다크 양쪽 검증

- Storybook 의 toolbar 에 light/dark toggle 이 있어야 함 (기본 설정).
- 새 컴포넌트는 toggle 로 양쪽 시각 검증 후 머지.
- 다크에서 본문 텍스트 / border / shadow 가 안 보이는 회귀 자주 발생 — 토큰 사용 일관성 검증.

## 시각 회귀 테스트

현재 스크린샷 기반 자동 회귀는 없음. PR 에 라이트 / 다크 스크린샷 첨부 권장 (또는 Chromatic 연동 검토).

## 파일 위치

- `src/stories/<Component>.stories.tsx` — 컴포넌트 스토리
- `src/stories/foundations/` — 토큰 / 색 / 타이포 / spacing 스토리
- `src/stories/patterns/` — 복합 패턴 (Sidebar 조합, 폼 레이아웃 등)

## 새 스토리 추가 시

1. 컴포넌트 export 가 `src/index.ts` 에 있는지 확인 (없으면 export 추가)
2. variant / size / state 모두 보여주는 일람 스토리
3. 라이트 / 다크 toggle 로 시각 검증
4. CSF 3.0 형식 (`StoryObj`) 사용 — storiesOf 형식 deprecated

## 빌드 산출물 정리

- `storybook-static/` 은 `.gitignore` 처리됨
- 스크린샷 파일 (`screenshots/`, `*.png`) 도 `.gitignore`
