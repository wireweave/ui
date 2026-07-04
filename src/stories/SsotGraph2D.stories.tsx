import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SsotGraph2D } from '../graph'
import type { GraphNode } from '../graph'
import { sampleGraphData } from './__fixtures__/ssot-graph-data'

const meta: Meta<typeof SsotGraph2D> = {
  title: 'Graph/SsotGraph2D',
  component: SsotGraph2D,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof SsotGraph2D>

function DefaultDemo() {
  const [clicked, setClicked] = React.useState<GraphNode | null>(null)

  return (
    <div className="relative h-screen w-full">
      <SsotGraph2D data={sampleGraphData} onNodeClick={setClicked} selectedNodeId={clicked?.id} />
      <div className="absolute top-4 left-4 z-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm text-[var(--color-card-foreground)] shadow-md">
        {clicked ? (
          <>
            <div className="font-semibold">{clicked.label}</div>
            <div className="text-[var(--color-muted-foreground)]">
              {clicked.kind} · {clicked.id}
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
  render: () => <DefaultDemo />,
}
