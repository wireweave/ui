'use client'

import * as React from 'react'
import { Button } from '../components/button'
import { cn } from '../lib/utils'
import { SsotGraph2D, SsotGraph3D } from './lazy'
import type { GraphData, GraphNode } from './types'

export type GraphViewMode = '3d' | '2d'

export interface SsotGraphViewProps {
  data: GraphData
  /** uncontrolled 초기 모드 (기본 `'3d'`). `mode` 가 주어지면 무시된다. */
  defaultMode?: GraphViewMode
  /** controlled 모드 — `onModeChange` 와 함께 사용. */
  mode?: GraphViewMode
  onModeChange?: (mode: GraphViewMode) => void
  onNodeClick?: (node: GraphNode) => void
  /** controlled 선택 노드 id. 미지정 시 내부에서 클릭 노드를 추적한다. */
  selectedNodeId?: string
  className?: string
}

const MODES: { value: GraphViewMode; label: string; ariaLabel: string }[] = [
  { value: '3d', label: '3D', ariaLabel: '3D graph view' },
  { value: '2d', label: '2D', ariaLabel: '2D graph view' },
]

/**
 * 3D/2D 토글이 달린 SSOT 그래프 뷰.
 * - 각 뷰는 lazy 경계(./lazy) 뒤에 있어 렌더되는 쪽 청크만 로드된다.
 * - 선택 노드 상태를 이 레벨에서 관리/전달 — 토글 전환에도 유지된다.
 */
export function SsotGraphView({
  data,
  defaultMode = '3d',
  mode: modeProp,
  onModeChange,
  onNodeClick,
  selectedNodeId,
  className,
}: SsotGraphViewProps) {
  const [internalMode, setInternalMode] = React.useState<GraphViewMode>(defaultMode)
  const mode = modeProp ?? internalMode

  const [internalSelectedId, setInternalSelectedId] = React.useState<string | undefined>(undefined)
  const resolvedSelectedId = selectedNodeId ?? internalSelectedId

  const handleModeChange = React.useCallback(
    (next: GraphViewMode) => {
      if (modeProp === undefined) setInternalMode(next)
      onModeChange?.(next)
    },
    [modeProp, onModeChange],
  )

  const handleNodeClick = React.useCallback(
    (node: GraphNode) => {
      setInternalSelectedId(node.id)
      onNodeClick?.(node)
    },
    [onNodeClick],
  )

  return (
    <div className={cn('relative h-full w-full', className)}>
      {mode === '3d' ? (
        <SsotGraph3D
          data={data}
          onNodeClick={handleNodeClick}
          selectedNodeId={resolvedSelectedId}
          className="h-full w-full"
        />
      ) : (
        <SsotGraph2D
          data={data}
          onNodeClick={handleNodeClick}
          selectedNodeId={resolvedSelectedId}
          className="h-full w-full"
        />
      )}
      <div
        role="group"
        aria-label="Graph view mode"
        className="absolute top-4 right-4 z-10 flex gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-1 shadow-sm"
      >
        {MODES.map(({ value, label, ariaLabel }) => (
          <Button
            key={value}
            size="sm"
            variant={mode === value ? 'primary' : 'ghost'}
            aria-label={ariaLabel}
            aria-pressed={mode === value}
            onClick={() => handleModeChange(value)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}
