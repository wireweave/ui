'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../lib/utils'
import { useCanvas, useCanvasInternal } from './canvas-viewport'

/**
 * Wireweave UI CanvasGrid
 *
 * dot 그리드 배경. transform 을 읽어 background-size/position 을 scale/offset 에 동기한다.
 * world 레이어 transform 의 영향을 받지 않도록 viewport 요소로 portal 되어
 * 화면 좌표계에서 그린다 (world 레이어 z-10 아래, z-0).
 */

const MIN_SCREEN_GAP = 12

export interface CanvasGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** dot 간격 (world px, 기본 24). */
  size?: number
}

const CanvasGrid = React.forwardRef<HTMLDivElement, CanvasGridProps>(
  ({ size = 24, className, ...props }, ref) => {
    const { transform } = useCanvas()
    const { viewportElement } = useCanvasInternal()

    if (!viewportElement) return null

    // 축소 시 dot 이 뭉개지지 않게 화면 간격이 최소치에 닿으면 간격을 2배씩 승격
    // (원 간격의 배수라 world 정렬 유지 — 지도 LOD 와 같은 원리).
    let gap = size * transform.scale
    while (gap < MIN_SCREEN_GAP) gap *= 2

    return createPortal(
      <div
        ref={ref}
        aria-hidden="true"
        className={cn('pointer-events-none absolute inset-0 z-0', className)}
        /* dot 색은 시맨틱 토큰(--color-border) 경유 — size/position 은 동적 기하값이라 inline */
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-border) 1px, transparent 1px)',
          backgroundSize: `${gap}px ${gap}px`,
          backgroundPosition: `${transform.x}px ${transform.y}px`,
        }}
        {...props}
      />,
      viewportElement,
    )
  },
)

CanvasGrid.displayName = 'CanvasGrid'

export { CanvasGrid }
