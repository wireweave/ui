'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { cva, type VariantProps } from 'class-variance-authority'
import { ZoomIn, ZoomOut, Maximize, RotateCcw } from 'lucide-react'
import { Button } from '../components/button'
import { cn } from '../lib/utils'
import { useCanvas, useCanvasInternal } from './canvas-viewport'

/**
 * Wireweave UI CanvasControls
 *
 * zoom out / 배율 표시 / zoom in / fit / reset 컨트롤 바.
 * world transform 의 영향을 받지 않도록 viewport 요소로 portal 되어
 * 화면 좌표계(absolute)에 고정된다 — 선언 위치는 CanvasViewport children 어디든 무방.
 */

const canvasControlsVariants = cva(
  'absolute z-20 flex items-center gap-0.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-1 shadow-md',
  {
    variants: {
      position: {
        'bottom-left': 'bottom-4 left-4',
        'bottom-right': 'right-4 bottom-4',
        'top-left': 'top-4 left-4',
        'top-right': 'top-4 right-4',
      },
    },
    defaultVariants: {
      position: 'bottom-left',
    },
  },
)

export interface CanvasControlsProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof canvasControlsVariants> {}

const CanvasControls = React.forwardRef<HTMLDivElement, CanvasControlsProps>(
  ({ position, className, ...props }, ref) => {
    const { transform, zoomIn, zoomOut, zoomToFit, reset } = useCanvas()
    const { viewportElement } = useCanvasInternal()

    if (!viewportElement) return null

    return createPortal(
      <div
        ref={ref}
        role="toolbar"
        aria-label="Canvas controls"
        className={cn(canvasControlsVariants({ position }), className)}
        /* 컨트롤 위 포인터 다운이 viewport pan 으로 번지지 않게 차단 */
        onPointerDown={(event) => event.stopPropagation()}
        {...props}
      >
        {/* 타깃 32px — WCAG 2.5.8 (24×24 최소) 충족 */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="Zoom out"
          title="Zoom out"
          onClick={zoomOut}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span
          className="min-w-12 px-1 text-center text-xs font-medium text-[var(--color-muted-foreground)] tabular-nums"
          title="Zoom level"
        >
          {Math.round(transform.scale * 100)}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="Zoom in"
          title="Zoom in"
          onClick={zoomIn}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="Zoom to fit"
          title="Zoom to fit"
          onClick={zoomToFit}
        >
          <Maximize className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="Reset view"
          title="Reset view"
          onClick={reset}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>,
      viewportElement,
    )
  },
)

CanvasControls.displayName = 'CanvasControls'

export { CanvasControls }
