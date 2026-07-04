'use client'

import * as React from 'react'
import { cn } from '../lib/utils'
import { useCanvasInternal } from './canvas-viewport'

/**
 * Wireweave UI CanvasFrame
 *
 * CanvasViewport world 좌표계에 absolute 배치되는 화면 프레임.
 *
 * - mount/props 변경 시 world-rect 를 viewport 에 등록 (zoomToFit 계산용)
 * - 클릭/키보드(Enter/Space)로 `onSelect(id)` 발화
 * - selected/focus 시 `--color-ring` 기반 ring (WCAG 2.4.7 포커스 가시성)
 * - 포인터 다운 시 stopPropagation — 프레임 위 드래그는 viewport pan 이 아니다
 */

export interface CanvasFrameProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'id' | 'title' | 'onSelect'
> {
  id: string
  /** world x 좌표 (px). */
  x: number
  /** world y 좌표 (px). */
  y: number
  width: number
  height: number
  /** 상단 타이틀 바 텍스트. 생략 시 타이틀 바 미표시. */
  title?: string
  selected?: boolean
  onSelect?: (id: string) => void
}

const CanvasFrame = React.forwardRef<HTMLDivElement, CanvasFrameProps>(
  (
    {
      id,
      x,
      y,
      width,
      height,
      title,
      selected = false,
      onSelect,
      className,
      children,
      onPointerDown,
      onClick,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const { registerFrame, unregisterFrame } = useCanvasInternal()

    React.useEffect(() => {
      registerFrame(id, { x, y, width, height })
      return () => unregisterFrame(id)
    }, [id, x, y, width, height, registerFrame, unregisterFrame])

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      // 프레임 위 포인터 다운이 viewport pan 으로 번지지 않게 차단
      event.stopPropagation()
      onPointerDown?.(event)
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(event)
      if (event.defaultPrevented) return
      onSelect?.(id)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event)
      if (event.defaultPrevented) return
      if (event.target !== event.currentTarget) return
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onSelect?.(id)
      }
    }

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex --
       캔버스 프레임은 임의 children 을 담는 선택 가능한 컨테이너다. button role 은 children
       시맨틱을 스크린리더에서 삼키므로 group role + tabIndex 로 구성한다
       (WAI-ARIA group + 키보드 조작 WCAG 2.1.1). */
    return (
      <div
        ref={ref}
        role="group"
        aria-label={title ?? `Frame ${id}`}
        tabIndex={0}
        data-selected={selected || undefined}
        className={cn(
          'absolute flex flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-card-foreground)] shadow-sm outline-none',
          'focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]',
          selected && 'ring-2 ring-[var(--color-ring)]',
          className,
        )}
        /* world 좌표/크기는 동적 기하값 — 디자인 토큰 대상이 아니라 inline style 로 배치 */
        style={{ left: x, top: y, width, height }}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {title !== undefined && (
          <div className="flex h-8 shrink-0 items-center border-b border-[var(--color-border)] bg-[var(--color-card)] px-3 text-xs font-medium text-[var(--color-card-foreground)]">
            <span className="truncate">{title}</span>
          </div>
        )}
        <div className="relative flex-1 overflow-hidden bg-[var(--color-card)]">{children}</div>
      </div>
    )
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
  },
)

CanvasFrame.displayName = 'CanvasFrame'

export { CanvasFrame }
