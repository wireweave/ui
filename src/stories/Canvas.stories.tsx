import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CanvasViewport, CanvasFrame, CanvasControls, CanvasGrid } from '../canvas'
import { Skeleton } from '../components/skeleton'

/**
 * 무한 캔버스 primitives.
 *
 * - 빈 배경 드래그 / 휠 = pan, ctrl(cmd)+휠 = 커서 기준 zoom
 * - 캔버스 포커스 후 화살표 = pan (shift 4배), `+`/`-` = zoom, `0` = reset
 * - 프레임 클릭 / Enter / Space = 선택 (ring 표시)
 * - 컨트롤 바: zoom out / 배율 / zoom in / fit / reset
 */
const meta: Meta<typeof CanvasViewport> = {
  title: 'Components/Canvas',
  component: CanvasViewport,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof CanvasViewport>

const FieldPlaceholder = () => <Skeleton className="h-9 w-full" />

const LinePlaceholder = ({ className }: { className?: string }) => (
  <Skeleton className={className ?? 'h-4 w-full'} />
)

const CanvasDemo = () => {
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  return (
    <CanvasViewport aria-label="Wireframe canvas" className="h-screen w-full">
      <CanvasGrid />
      <CanvasControls />
      <CanvasFrame
        id="login"
        title="Login"
        x={120}
        y={120}
        width={320}
        height={360}
        selected={selectedId === 'login'}
        onSelect={setSelectedId}
      >
        <div className="flex h-full flex-col gap-3 p-4">
          <LinePlaceholder className="h-5 w-24" />
          <FieldPlaceholder />
          <FieldPlaceholder />
          <Skeleton className="mt-2 h-9 w-full rounded-lg" />
          <LinePlaceholder className="mt-auto h-3 w-40" />
        </div>
      </CanvasFrame>
      <CanvasFrame
        id="dashboard"
        title="Dashboard"
        x={540}
        y={60}
        width={480}
        height={320}
        selected={selectedId === 'dashboard'}
        onSelect={setSelectedId}
      >
        <div className="grid h-full grid-cols-3 gap-3 p-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="col-span-3 flex-1 self-stretch" />
        </div>
      </CanvasFrame>
      <CanvasFrame
        id="settings"
        title="Settings"
        x={140}
        y={560}
        width={360}
        height={280}
        selected={selectedId === 'settings'}
        onSelect={setSelectedId}
      >
        <div className="flex h-full flex-col gap-3 p-4">
          <LinePlaceholder className="h-4 w-32" />
          <FieldPlaceholder />
          <LinePlaceholder className="h-4 w-24" />
          <FieldPlaceholder />
        </div>
      </CanvasFrame>
      <CanvasFrame
        id="profile"
        title="Profile"
        x={600}
        y={460}
        width={300}
        height={300}
        selected={selectedId === 'profile'}
        onSelect={setSelectedId}
      >
        <div className="flex h-full flex-col items-center gap-3 p-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <LinePlaceholder className="h-4 w-28" />
          <LinePlaceholder className="h-3 w-40" />
          <Skeleton className="mt-2 h-9 w-full" />
        </div>
      </CanvasFrame>
    </CanvasViewport>
  )
}

export const Default: Story = {
  render: () => <CanvasDemo />,
}

/** 프레임이 없을 때 zoom-to-fit 이 no-op 인지 확인용. */
export const Empty: Story = {
  render: () => (
    <CanvasViewport aria-label="Empty canvas" className="h-screen w-full">
      <CanvasGrid />
      <CanvasControls />
    </CanvasViewport>
  ),
}
