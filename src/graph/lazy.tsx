'use client'

import * as React from 'react'
import { Skeleton } from '../components/skeleton'
import { cn } from '../lib/utils'
import type { SsotGraph3DProps } from './ssot-graph-3d'
import type { SsotGraph2DProps } from './ssot-graph-2d'

/**
 * 3D/2D 그래프의 공개 export 는 lazy 경계 뒤의 래퍼다.
 *
 * graph entry(index.ts)가 구현 모듈을 정적으로 재-export 하면 dynamic import 가
 * 같은 청크로 병합되어 번들 분리(SCN-5)가 무산된다. 그래서 구현 모듈은 오직
 * 이 dynamic import 로만 도달하게 하고, 소비자는 Suspense 를 신경 쓸 필요 없이
 * 동일 props 계약으로 사용한다 — 무거운 peer(three, @xyflow/react)는 실제로
 * 렌더되는 뷰의 청크에서만 로드된다.
 */

const LazyGraph3D = React.lazy(() =>
  import('./ssot-graph-3d').then((module) => ({ default: module.SsotGraph3D })),
)

const LazyGraph2D = React.lazy(() =>
  import('./ssot-graph-2d').then((module) => ({ default: module.SsotGraph2D })),
)

function GraphFallback({ className }: { className?: string }) {
  return <Skeleton className={cn('h-full w-full', className)} />
}

export function SsotGraph3D(props: SsotGraph3DProps) {
  return (
    <React.Suspense fallback={<GraphFallback className={props.className} />}>
      <LazyGraph3D {...props} />
    </React.Suspense>
  )
}

export function SsotGraph2D(props: SsotGraph2DProps) {
  return (
    <React.Suspense fallback={<GraphFallback className={props.className} />}>
      <LazyGraph2D {...props} />
    </React.Suspense>
  )
}
