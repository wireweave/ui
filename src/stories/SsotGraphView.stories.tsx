import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SsotGraphView } from '../graph'
import type { GraphNode, GraphViewMode } from '../graph'
import { sampleGraphData } from './__fixtures__/ssot-graph-data'

const meta: Meta<typeof SsotGraphView> = {
  title: 'Graph/SsotGraphView',
  component: SsotGraphView,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof SsotGraphView>

function ToggleDemo() {
  const [clicked, setClicked] = React.useState<GraphNode | null>(null)

  return (
    <div className="relative h-screen w-full">
      <SsotGraphView data={sampleGraphData} onNodeClick={setClicked} />
      <div className="absolute top-4 left-4 z-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm text-[var(--color-card-foreground)] shadow-md">
        {clicked ? (
          <>
            <div className="font-semibold">{clicked.label}</div>
            <div className="text-[var(--color-muted-foreground)]">
              {clicked.kind} · {clicked.id}
            </div>
            <div className="mt-1 text-xs text-[var(--color-muted-foreground)]">
              3D↔2D 토글해도 선택이 유지됩니다
            </div>
          </>
        ) : (
          <div className="text-[var(--color-muted-foreground)]">노드를 클릭하세요</div>
        )}
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => <ToggleDemo />,
}

function ControlledModeDemo() {
  const [mode, setMode] = React.useState<GraphViewMode>('2d')

  return (
    <div className="relative h-screen w-full">
      <SsotGraphView data={sampleGraphData} mode={mode} onModeChange={setMode} />
      <div className="absolute bottom-4 left-4 z-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm text-[var(--color-card-foreground)] shadow-md">
        controlled mode: <span className="font-semibold">{mode}</span>
      </div>
    </div>
  )
}

export const ControlledMode: Story = {
  render: () => <ControlledModeDemo />,
}
