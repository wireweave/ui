'use client'

import * as React from 'react'
import {
  Background,
  Handle,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'
import type { Edge, Node, NodeProps, NodeTypes } from '@xyflow/react'
import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  type SimulationNodeDatum,
} from 'd3-force-3d'
import '@xyflow/react/dist/style.css'
import { cn } from '../lib/utils'
import { kindStyle } from './kind-tokens'
import type { GraphData, GraphNode } from './types'

interface SsotNodeData extends Record<string, unknown> {
  label: string
  kind: string
  isSelected: boolean
  /** 콜백으로 되돌려줄 원본 계약 형태의 노드 (deep-clone 본). */
  node: GraphNode
}

type SsotFlowNode = Node<SsotNodeData, 'ssot'>

/** kind 색 dot + 라벨 커스텀 노드. 선택 시 ring 토큰으로 강조. */
function SsotNode({ data }: NodeProps<SsotFlowNode>) {
  return (
    <div
      className={cn(
        'flex cursor-pointer items-center gap-1.5 rounded-full border bg-[var(--color-card)] px-2.5 py-1 text-xs text-[var(--color-card-foreground)] shadow-sm',
        data.isSelected
          ? 'border-[var(--color-ring)] ring-2 ring-[var(--color-ring)]'
          : 'border-[var(--color-border)]',
      )}
    >
      <span
        aria-hidden
        className={cn('h-2.5 w-2.5 shrink-0 rounded-full', kindStyle(data.kind).dotClass)}
      />
      <span>{data.label}</span>
      <Handle type="target" position={Position.Top} className="pointer-events-none opacity-0!" />
      <Handle type="source" position={Position.Bottom} className="pointer-events-none opacity-0!" />
    </div>
  )
}

const nodeTypes: NodeTypes = { ssot: SsotNode }

const defaultEdgeOptions = {
  style: { stroke: 'var(--color-border)' },
}

type SimNode = GraphNode & SimulationNodeDatum

export interface SsotGraph2DProps {
  data: GraphData
  onNodeClick?: (node: GraphNode) => void
  /** 선택 노드 id — 해당 노드는 ring 토큰으로 강조된다. */
  selectedNodeId?: string
  className?: string
}

/**
 * @xyflow/react 기반 SSOT 2D 그래프. SsotGraph3D 와 동일한 GraphData 계약.
 * - 레이아웃: d3-force-3d 를 numDimensions=2 로 마운트 시 1회 시뮬레이션 → 좌표 계산.
 *   이후 드래그/pan/zoom 은 xyflow 내장 동작.
 * - 노드 색: kind → 시맨틱 토큰 (DOM 이므로 `var()` 직접 참조 — 테마 전환 자동 반영)
 * - 입력은 deep-clone 후 사용 — d3-force 가 link.source/target 을 in-place 로
 *   변형하므로 호출자 데이터를 오염시키지 않는다.
 */
export function SsotGraph2D({ data, onNodeClick, selectedNodeId, className }: SsotGraph2DProps) {
  const { initialNodes, initialEdges } = React.useMemo(() => {
    const cloned = structuredClone(data)

    // 시뮬레이션은 별도 얕은 복사본에서 실행 — cloned.nodes 를 좌표 필드로 오염시키지 않는다.
    const simNodes: SimNode[] = cloned.nodes.map((node) => ({ ...node }))
    const simLinks = cloned.links.map((link) => ({ source: link.source, target: link.target }))

    forceSimulation(simNodes, 2)
      .force(
        'link',
        forceLink<SimNode, { source: unknown; target: unknown }>(simLinks)
          .id((node) => node.id)
          .distance(90),
      )
      .force('charge', forceManyBody().strength(-240))
      .force('center', forceCenter(0, 0))
      .stop()
      .tick(300)

    const nodes: SsotFlowNode[] = simNodes.map((simNode, index) => ({
      id: simNode.id,
      type: 'ssot',
      position: { x: simNode.x ?? 0, y: simNode.y ?? 0 },
      data: {
        label: simNode.label,
        kind: simNode.kind,
        isSelected: false,
        node: cloned.nodes[index],
      },
    }))

    const edges: Edge[] = cloned.links.map((link, index) => ({
      id: `${link.source}->${link.target}-${index}`,
      source: link.source,
      target: link.target,
    }))

    return { initialNodes: nodes, initialEdges: edges }
  }, [data])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // 데이터 변경 시 레이아웃 재계산 결과로 리셋.
  React.useEffect(() => {
    setNodes(initialNodes)
    setEdges(initialEdges)
  }, [initialNodes, initialEdges, setNodes, setEdges])

  // 선택 노드 강조 — 드래그된 좌표는 유지한 채 data 플래그만 갱신.
  React.useEffect(() => {
    setNodes((current) =>
      current.map((node) =>
        node.data.isSelected === (node.id === selectedNodeId)
          ? node
          : { ...node, data: { ...node.data, isSelected: node.id === selectedNodeId } },
      ),
    )
  }, [selectedNodeId, setNodes])

  const handleNodeClick = React.useCallback(
    (_event: React.MouseEvent, node: SsotFlowNode) => {
      onNodeClick?.(node.data.node)
    },
    [onNodeClick],
  )

  return (
    <div className={cn('relative h-full w-full', className)}>
      <ReactFlow<SsotFlowNode>
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onNodeClick={handleNodeClick}
        fitView
        nodesConnectable={false}
        deleteKeyCode={null}
        className="bg-[var(--color-background)]"
      >
        <Background gap={24} color="var(--color-border)" />
      </ReactFlow>
    </div>
  )
}
