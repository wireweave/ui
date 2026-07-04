'use client'

import * as React from 'react'
import ForceGraph3D from 'react-force-graph-3d'
import { Text as TroikaText } from 'troika-three-text'
import type { Object3D } from 'three'
import { cn } from '../lib/utils'
import { useSemanticColors } from './use-semantic-color'
import { KIND_TOKENS, kindStyle } from './kind-tokens'
import type { GraphData, GraphLink, GraphNode } from './types'

const BACKGROUND_TOKEN = '--color-background'
const LINK_TOKEN = '--color-muted-foreground'
const RING_TOKEN = '--color-ring'

const ALL_TOKENS = [...KIND_TOKENS, BACKGROUND_TOKEN, LINK_TOKEN, RING_TOKEN]

export interface SsotGraph3DProps {
  data: GraphData
  onNodeClick?: (node: GraphNode) => void
  /** 선택 노드 id — 해당 노드는 ring 토큰 색으로 강조된다. */
  selectedNodeId?: string
  width?: number
  height?: number
  className?: string
}

/**
 * react-force-graph-3d 기반 SSOT 3D 그래프.
 * - 노드 색: kind → 시맨틱 토큰 → 계산값 해석 (useSemanticColors 경유, 테마 라이브 반응)
 * - 노드 라벨: troika-three-text `Text` 를 nodeThreeObject 로 실제 렌더 (제거 시 dispose)
 * - 크기: width/height 미지정 시 ResizeObserver 로 컨테이너 크기를 추적
 * - 입력은 deep-clone 후 전달 — react-force-graph-3d 가 link.source/target 을
 *   in-place 로 노드 객체 참조로 변형하므로 호출자 데이터를 오염시키지 않는다.
 */
export function SsotGraph3D({
  data,
  onNodeClick,
  selectedNodeId,
  width,
  height,
  className,
}: SsotGraph3DProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const labelsRef = React.useRef(new Map<string, TroikaText>())

  // 시맨틱 토큰 해석 + 다크 토글/시스템 테마 변경에 라이브 반응.
  const colors = useSemanticColors(containerRef, ALL_TOKENS)

  // width/height 미지정 시 컨테이너 크기 추적 (window 폴백 없음).
  const [measured, setMeasured] = React.useState<{ width: number; height: number } | null>(null)
  React.useEffect(() => {
    if (width !== undefined && height !== undefined) return
    const el = containerRef.current
    if (!el) return
    const update = () => setMeasured({ width: el.clientWidth, height: el.clientHeight })
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [width, height])

  // deep-clone: 라이브러리의 in-place mutation 으로부터 원본 데이터 보호.
  const graphData = React.useMemo(() => structuredClone(data), [data])

  // 데이터 변경으로 제거된 노드의 troika Text 리소스 해제.
  React.useEffect(() => {
    const labels = labelsRef.current
    const ids = new Set(graphData.nodes.map((node) => node.id))
    for (const [id, label] of labels) {
      if (!ids.has(id)) {
        label.dispose()
        labels.delete(id)
      }
    }
  }, [graphData])

  // unmount 시 모든 troika Text 리소스 해제 (three 리소스 누수 방지).
  React.useEffect(() => {
    const labels = labelsRef.current
    return () => {
      for (const label of labels.values()) label.dispose()
      labels.clear()
    }
  }, [])

  const nodeColor = React.useCallback(
    (node: GraphNode) => {
      if (!colors) return ''
      if (selectedNodeId !== undefined && node.id === selectedNodeId) return colors[RING_TOKEN]
      return colors[kindStyle(node.kind).token]
    },
    [colors, selectedNodeId],
  )

  // troika-three-text 라벨 — 기본 노드 구체를 유지한 채(nodeThreeObjectExtend) 위에 얹는다.
  // 같은 노드의 라벨이 재생성되면 (색 갱신 등) 이전 인스턴스를 dispose 한다.
  const nodeThreeObject = React.useCallback(
    (node: GraphNode): Object3D => {
      const previous = labelsRef.current.get(node.id)
      if (previous) previous.dispose()

      const label = new TroikaText()
      label.text = node.label
      label.fontSize = 3
      label.color = colors?.[kindStyle(node.kind).token] ?? ''
      label.anchorX = 'center'
      label.anchorY = 'bottom'
      label.position.y = 6
      label.sync()
      labelsRef.current.set(node.id, label)
      return label
    },
    [colors],
  )

  const handleNodeClick = React.useCallback(
    (node: GraphNode) => {
      onNodeClick?.(node)
    },
    [onNodeClick],
  )

  const resolvedWidth = width ?? measured?.width
  const resolvedHeight = height ?? measured?.height

  // SSR 가드 — WebGL/window 없는 환경에서는 렌더하지 않는다.
  // (훅은 전부 위에서 무조건 호출되므로 rules-of-hooks 위반 없음)
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) {
    return null
  }

  return (
    <div ref={containerRef} className={cn('relative h-full w-full', className)}>
      {colors && resolvedWidth !== undefined && resolvedHeight !== undefined && (
        <ForceGraph3D<GraphNode, GraphLink>
          graphData={graphData}
          width={resolvedWidth}
          height={resolvedHeight}
          backgroundColor={colors[BACKGROUND_TOKEN]}
          nodeColor={nodeColor}
          nodeLabel="label"
          nodeThreeObject={nodeThreeObject}
          nodeThreeObjectExtend
          linkColor={() => colors[LINK_TOKEN]}
          linkOpacity={0.5}
          onNodeClick={handleNodeClick}
        />
      )}
    </div>
  )
}
