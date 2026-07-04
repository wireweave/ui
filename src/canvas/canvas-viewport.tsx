'use client'

import * as React from 'react'
import { cn } from '../lib/utils'

/**
 * Wireweave UI CanvasViewport
 *
 * 무한 캔버스 pan/zoom 셸. world 레이어 하나를 CSS transform 으로 움직인다.
 *
 * - controlled(`transform` + `onTransformChange`) / uncontrolled(`defaultTransform`) 모두 지원
 * - 인터랙션 (Figma 관례):
 *   - 빈 배경 포인터 드래그 = pan (CanvasFrame 은 stopPropagation 으로 제외)
 *   - wheel = pan, ctrl/cmd + wheel = 커서 기준 zoom (브라우저 핀치는 ctrl+wheel 로 들어옴)
 *   - 키보드(포커스 시): 화살표 = pan (40px, shift 4배), `+`/`=` zoom in, `-` zoom out, `0` reset
 * - `useCanvas()` 로 자식(CanvasControls / CanvasGrid / 앱 코드)이 transform 을 읽고 제어한다.
 */

export interface CanvasTransform {
  x: number
  y: number
  scale: number
}

interface FrameRect {
  x: number
  y: number
  width: number
  height: number
}

const DEFAULT_TRANSFORM: CanvasTransform = { x: 0, y: 0, scale: 1 }
const DEFAULT_MIN_SCALE = 0.1
const DEFAULT_MAX_SCALE = 4
const ZOOM_STEP = 1.25
const PAN_STEP = 40
const PAN_STEP_FAST_MULTIPLIER = 4
const FIT_PADDING = 48

function clampScale(scale: number, minScale: number, maxScale: number): number {
  return Math.min(maxScale, Math.max(minScale, scale))
}

interface CanvasContextValue {
  transform: CanvasTransform
  setTransform: (next: CanvasTransform | ((prev: CanvasTransform) => CanvasTransform)) => void
  zoomIn: () => void
  zoomOut: () => void
  zoomTo: (scale: number) => void
  zoomToFit: () => void
  reset: () => void
}

const CanvasContext = React.createContext<CanvasContextValue | undefined>(undefined)

export function useCanvas(): CanvasContextValue {
  const ctx = React.useContext(CanvasContext)
  if (!ctx) {
    throw new Error('useCanvas must be used within a CanvasViewport')
  }
  return ctx
}

interface CanvasInternalContextValue {
  /** 화면 좌표계 오버레이(grid/controls)의 portal 대상. mount 전에는 null. */
  viewportElement: HTMLDivElement | null
  registerFrame: (id: string, rect: FrameRect) => void
  unregisterFrame: (id: string) => void
}

const CanvasInternalContext = React.createContext<CanvasInternalContextValue | undefined>(undefined)

/** CanvasFrame / CanvasGrid / CanvasControls 전용 내부 훅 — barrel 미공개. */
export function useCanvasInternal(): CanvasInternalContextValue {
  const ctx = React.useContext(CanvasInternalContext)
  if (!ctx) {
    throw new Error('Canvas components must be used within a CanvasViewport')
  }
  return ctx
}

export interface CanvasViewportProps extends React.HTMLAttributes<HTMLDivElement> {
  /** controlled transform. `onTransformChange` 와 함께 사용. */
  transform?: CanvasTransform
  /** uncontrolled 초기 transform (기본 `{ x: 0, y: 0, scale: 1 }`). */
  defaultTransform?: CanvasTransform
  onTransformChange?: (transform: CanvasTransform) => void
  /** zoom 하한 (기본 0.1). */
  minScale?: number
  /** zoom 상한 (기본 4). */
  maxScale?: number
}

const CanvasViewport = React.forwardRef<HTMLDivElement, CanvasViewportProps>(
  (
    {
      transform: transformProp,
      defaultTransform,
      onTransformChange,
      minScale = DEFAULT_MIN_SCALE,
      maxScale = DEFAULT_MAX_SCALE,
      'aria-label': ariaLabel = 'Canvas',
      className,
      children,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const isControlled = transformProp !== undefined
    const [internalTransform, setInternalTransform] = React.useState<CanvasTransform>(
      () => defaultTransform ?? DEFAULT_TRANSFORM,
    )
    const transform = isControlled ? transformProp : internalTransform

    // "latest ref" 패턴 — 드래그/휠처럼 렌더보다 빠른 이벤트 스트림에서 최신 값 참조.
    const transformRef = React.useRef(transform)
    React.useEffect(() => {
      transformRef.current = transform
    })
    const isControlledRef = React.useRef(isControlled)
    React.useEffect(() => {
      isControlledRef.current = isControlled
    })
    const onTransformChangeRef = React.useRef(onTransformChange)
    React.useEffect(() => {
      onTransformChangeRef.current = onTransformChange
    })

    const [viewportEl, setViewportEl] = React.useState<HTMLDivElement | null>(null)
    const viewportRef = React.useRef<HTMLDivElement | null>(null)
    const composedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        viewportRef.current = node
        setViewportEl(node)
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      },
      [ref],
    )

    const setTransform = React.useCallback(
      (next: CanvasTransform | ((prev: CanvasTransform) => CanvasTransform)) => {
        const resolved = typeof next === 'function' ? next(transformRef.current) : next
        const clamped: CanvasTransform = {
          x: resolved.x,
          y: resolved.y,
          scale: clampScale(resolved.scale, minScale, maxScale),
        }
        // 동기 갱신 — 다음 렌더 전에 도착하는 이벤트도 최신 값에서 계산된다.
        transformRef.current = clamped
        if (!isControlledRef.current) setInternalTransform(clamped)
        onTransformChangeRef.current?.(clamped)
      },
      [minScale, maxScale],
    )

    /** factor 배율로 zoom. center(viewport-local px) 생략 시 viewport 중심 기준. */
    const zoomBy = React.useCallback(
      (factor: number, centerX?: number, centerY?: number) => {
        const el = viewportRef.current
        setTransform((prev) => {
          const nextScale = clampScale(prev.scale * factor, minScale, maxScale)
          const k = nextScale / prev.scale
          const cx = centerX ?? (el ? el.clientWidth / 2 : 0)
          const cy = centerY ?? (el ? el.clientHeight / 2 : 0)
          return {
            x: cx - (cx - prev.x) * k,
            y: cy - (cy - prev.y) * k,
            scale: nextScale,
          }
        })
      },
      [setTransform, minScale, maxScale],
    )

    const zoomIn = React.useCallback(() => zoomBy(ZOOM_STEP), [zoomBy])
    const zoomOut = React.useCallback(() => zoomBy(1 / ZOOM_STEP), [zoomBy])
    const zoomTo = React.useCallback(
      (scale: number) => {
        zoomBy(clampScale(scale, minScale, maxScale) / transformRef.current.scale)
      },
      [zoomBy, minScale, maxScale],
    )
    const reset = React.useCallback(() => setTransform(DEFAULT_TRANSFORM), [setTransform])

    // 프레임 world-rect 레지스트리 — zoomToFit 만 읽으므로 리렌더 불필요한 ref Map.
    const framesRef = React.useRef(new Map<string, FrameRect>())
    const registerFrame = React.useCallback((id: string, rect: FrameRect) => {
      framesRef.current.set(id, rect)
    }, [])
    const unregisterFrame = React.useCallback((id: string) => {
      framesRef.current.delete(id)
    }, [])

    const zoomToFit = React.useCallback(() => {
      const el = viewportRef.current
      const rects = Array.from(framesRef.current.values())
      if (!el || rects.length === 0) return
      let minX = Infinity
      let minY = Infinity
      let maxX = -Infinity
      let maxY = -Infinity
      for (const rect of rects) {
        minX = Math.min(minX, rect.x)
        minY = Math.min(minY, rect.y)
        maxX = Math.max(maxX, rect.x + rect.width)
        maxY = Math.max(maxY, rect.y + rect.height)
      }
      const boundsWidth = Math.max(maxX - minX, 1)
      const boundsHeight = Math.max(maxY - minY, 1)
      const viewWidth = el.clientWidth
      const viewHeight = el.clientHeight
      const scale = clampScale(
        Math.min(
          (viewWidth - FIT_PADDING * 2) / boundsWidth,
          (viewHeight - FIT_PADDING * 2) / boundsHeight,
        ),
        minScale,
        maxScale,
      )
      setTransform({
        x: (viewWidth - boundsWidth * scale) / 2 - minX * scale,
        y: (viewHeight - boundsHeight * scale) / 2 - minY * scale,
        scale,
      })
    }, [setTransform, minScale, maxScale])

    // wheel — React 의 onWheel 은 root 에 passive 로 붙어 preventDefault 가 불가.
    // 페이지 스크롤/브라우저 zoom 을 막아야 하므로 non-passive 네이티브 리스너를 직접 단다.
    React.useEffect(() => {
      if (!viewportEl) return
      const handleWheel = (event: WheelEvent) => {
        event.preventDefault()
        if (event.ctrlKey || event.metaKey) {
          const rect = viewportEl.getBoundingClientRect()
          // d3-zoom 관례의 deltaMode 정규화 감도 — 0=pixel(트랙패드/일반 휠), 1=line(Firefox 휠), 2=page.
          // 마우스 휠 1노치(deltaY≈120)가 ×1.27 수준으로 부드럽게 떨어진다.
          const sensitivity = event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002
          const factor = Math.exp(-event.deltaY * sensitivity)
          zoomBy(factor, event.clientX - rect.left, event.clientY - rect.top)
        } else {
          setTransform((prev) => ({
            ...prev,
            x: prev.x - event.deltaX,
            y: prev.y - event.deltaY,
          }))
        }
      }
      viewportEl.addEventListener('wheel', handleWheel, { passive: false })
      return () => viewportEl.removeEventListener('wheel', handleWheel)
    }, [viewportEl, zoomBy, setTransform])

    // 빈 배경 드래그 = pan (프레임/컨트롤은 stopPropagation 으로 도달하지 않음)
    const [dragging, setDragging] = React.useState(false)
    const lastPointRef = React.useRef<{ x: number; y: number } | null>(null)

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      onPointerDown?.(event)
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      event.currentTarget.setPointerCapture(event.pointerId)
      lastPointRef.current = { x: event.clientX, y: event.clientY }
      setDragging(true)
    }

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
      onPointerMove?.(event)
      if (event.defaultPrevented) return
      const last = lastPointRef.current
      if (!last) return
      const dx = event.clientX - last.x
      const dy = event.clientY - last.y
      lastPointRef.current = { x: event.clientX, y: event.clientY }
      setTransform((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }))
    }

    const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
      if (lastPointRef.current === null) return
      lastPointRef.current = null
      setDragging(false)
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId)
      }
    }

    const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
      onPointerUp?.(event)
      if (event.defaultPrevented) return
      endDrag(event)
    }

    const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
      onPointerCancel?.(event)
      endDrag(event)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event)
      if (event.defaultPrevented) return
      // 프레임 등 내부 포커스 대상의 키 입력은 pan/zoom 으로 가로채지 않는다.
      if (event.target !== event.currentTarget) return
      const step = event.shiftKey ? PAN_STEP * PAN_STEP_FAST_MULTIPLIER : PAN_STEP
      switch (event.key) {
        case 'ArrowLeft':
          setTransform((prev) => ({ ...prev, x: prev.x + step }))
          break
        case 'ArrowRight':
          setTransform((prev) => ({ ...prev, x: prev.x - step }))
          break
        case 'ArrowUp':
          setTransform((prev) => ({ ...prev, y: prev.y + step }))
          break
        case 'ArrowDown':
          setTransform((prev) => ({ ...prev, y: prev.y - step }))
          break
        case '+':
        case '=':
          zoomIn()
          break
        case '-':
        case '_':
          zoomOut()
          break
        case '0':
          reset()
          break
        default:
          return
      }
      event.preventDefault()
    }

    const contextValue = React.useMemo<CanvasContextValue>(
      () => ({ transform, setTransform, zoomIn, zoomOut, zoomTo, zoomToFit, reset }),
      [transform, setTransform, zoomIn, zoomOut, zoomTo, zoomToFit, reset],
    )
    const internalValue = React.useMemo<CanvasInternalContextValue>(
      () => ({ viewportElement: viewportEl, registerFrame, unregisterFrame }),
      [viewportEl, registerFrame, unregisterFrame],
    )

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex --
       viewport 는 role="application" 인터랙티브 캔버스다. jsx-a11y 의 aria-query 는
       application 을 non-interactive 로 분류하지만, ARIA application role 이 바로
       "위젯이 자체 키보드 모델을 소유"하는 컨테이너다 (키보드 pan/zoom — WCAG 2.1.1). */
    return (
      <CanvasContext.Provider value={contextValue}>
        <CanvasInternalContext.Provider value={internalValue}>
          <div
            ref={composedRef}
            role="application"
            aria-label={ariaLabel}
            tabIndex={0}
            className={cn(
              'relative isolate touch-none overflow-hidden bg-[var(--color-background)] outline-none select-none',
              'focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-inset',
              dragging ? 'cursor-grabbing' : 'cursor-grab',
              className,
            )}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onKeyDown={handleKeyDown}
            {...props}
          >
            {/* world 레이어 — transform 은 동적 기하값이라 inline style 이 유일한 표현 수단 (디자인 토큰 아님) */}
            <div
              className="absolute top-0 left-0 z-10 origin-top-left will-change-transform"
              style={{
                transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
              }}
            >
              {children}
            </div>
          </div>
        </CanvasInternalContext.Provider>
      </CanvasContext.Provider>
    )
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
  },
)

CanvasViewport.displayName = 'CanvasViewport'

export { CanvasViewport }
