'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '../lib/utils'
import { Badge, type BadgeProps } from './badge'

/**
 * Wireweave UI NodeDetailPanel
 * SSOT 노드 상세 패널 셸 — 순수 표시/슬롯 (데이터 페칭 · LLM 로직 없음).
 * 앱(dashboard / wireweave-studio)이 노드 데이터를 props 로 주입한다.
 */

/**
 * SSOT 노드 kind → Badge variant 매핑.
 * graph/kind-tokens.ts 의 kind 팔레트와 시각적으로 일관되게 유지한다
 * (blue 계열 → blue/primary, green 계열 → green/success, …).
 */
const KIND_BADGE_VARIANTS: Record<string, BadgeProps['variant']> = {
  Platform: 'outline',
  Persona: 'purple',
  Domain: 'blue',
  Concept: 'default',
  Capability: 'green',
  SystemComponent: 'default',
  Integration: 'yellow',
  Invariant: 'red',
  Decision: 'primary',
  Screen: 'success',
  Endpoint: 'warning',
  Flow: 'destructive',
}

function kindBadgeVariant(kind: string): BadgeProps['variant'] {
  return KIND_BADGE_VARIANTS[kind] ?? 'default'
}

export interface NodeDetailPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible name for the region — pass the node title (WCAG 4.1.2). */
  label: string
}

const NodeDetailPanel = React.forwardRef<HTMLDivElement, NodeDetailPanelProps>(
  ({ className, label, ...props }, ref) => (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      className={cn(
        'flex h-full min-h-0 flex-col overflow-hidden rounded-xl border shadow-sm',
        'border-[var(--color-border)] bg-[var(--color-card)]',
        className,
      )}
      {...props}
    />
  ),
)
NodeDetailPanel.displayName = 'NodeDetailPanel'

export interface NodeDetailPanelHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** SSOT node kind — rendered as a Badge, colour-aligned with the graph kind palette. */
  kind: string
  title: string
  /** Secondary text (node id, path, …). */
  meta?: React.ReactNode
  /** When provided, renders a close (X) button. */
  onClose?: () => void
}

const NodeDetailPanelHeader = React.forwardRef<HTMLDivElement, NodeDetailPanelHeaderProps>(
  ({ className, kind, title, meta, onClose, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-none items-start justify-between gap-3 border-b px-5 py-4',
        'border-[var(--color-border)]',
        className,
      )}
      {...props}
    >
      <div className="min-w-0">
        <Badge variant={kindBadgeVariant(kind)}>{kind}</Badge>
        <h2 className="mt-2 truncate text-base font-semibold text-[var(--color-foreground)]">
          {title}
        </h2>
        {meta != null && (
          <p className="mt-1 truncate text-xs text-[var(--color-muted-foreground)]">{meta}</p>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          aria-label="Close panel"
          onClick={onClose}
          className={cn(
            'inline-flex h-8 w-8 flex-none cursor-pointer items-center justify-center rounded-md transition-colors',
            'text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]',
            'focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:outline-none',
            'ring-offset-[var(--color-ring-offset)]',
          )}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  ),
)
NodeDetailPanelHeader.displayName = 'NodeDetailPanelHeader'

/** Scrollable middle area — header/footer stay pinned while sections scroll. */
const NodeDetailPanelBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4', className)}
      {...props}
    />
  ),
)
NodeDetailPanelBody.displayName = 'NodeDetailPanelBody'

export interface NodeDetailPanelSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string
}

const NodeDetailPanelSection = React.forwardRef<HTMLElement, NodeDetailPanelSectionProps>(
  ({ className, title, children, ...props }, ref) => (
    <section ref={ref} className={cn('space-y-2', className)} {...props}>
      <h3 className="text-xs font-semibold tracking-wider text-[var(--color-muted-foreground)] uppercase">
        {title}
      </h3>
      {children}
    </section>
  ),
)
NodeDetailPanelSection.displayName = 'NodeDetailPanelSection'

export interface NodeDetailPanelEdge {
  id: string
  /** Relation label (e.g. `depends on`, `renders`). */
  label: string
  /** Target node title. */
  targetLabel: string
  /** Target node kind — rendered as a Badge when present. */
  kind?: string
}

export interface NodeDetailPanelEdgesProps extends React.HTMLAttributes<HTMLDivElement> {
  edges: NodeDetailPanelEdge[]
  onEdgeClick?: (id: string) => void
  /** Text shown when `edges` is empty. */
  emptyText?: string
}

const NodeDetailPanelEdges = React.forwardRef<HTMLDivElement, NodeDetailPanelEdgesProps>(
  ({ className, edges, onEdgeClick, emptyText = 'No connections', ...props }, ref) => (
    <div ref={ref} className={cn('space-y-1.5', className)} {...props}>
      {edges.length === 0 ? (
        <p className="rounded-lg border border-dashed border-[var(--color-border)] px-3 py-4 text-center text-sm text-[var(--color-muted-foreground)]">
          {emptyText}
        </p>
      ) : (
        edges.map((edge) => (
          <button
            key={edge.id}
            type="button"
            onClick={() => onEdgeClick?.(edge.id)}
            className={cn(
              'flex w-full cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-left transition-colors',
              'border-[var(--color-border)] bg-[var(--color-card)] hover:bg-[var(--color-muted)]',
              'focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:outline-none',
              'ring-offset-[var(--color-ring-offset)]',
            )}
          >
            <span className="flex-none text-xs text-[var(--color-muted-foreground)]">
              {edge.label}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--color-foreground)]">
              {edge.targetLabel}
            </span>
            {edge.kind && (
              <Badge variant={kindBadgeVariant(edge.kind)} className="flex-none">
                {edge.kind}
              </Badge>
            )}
          </button>
        ))
      )}
    </div>
  ),
)
NodeDetailPanelEdges.displayName = 'NodeDetailPanelEdges'

const NodeDetailPanelFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-none items-center justify-end gap-2 border-t px-5 py-4',
      'border-[var(--color-border)] bg-[var(--color-muted)]',
      className,
    )}
    {...props}
  />
))
NodeDetailPanelFooter.displayName = 'NodeDetailPanelFooter'

export {
  NodeDetailPanel,
  NodeDetailPanelHeader,
  NodeDetailPanelBody,
  NodeDetailPanelSection,
  NodeDetailPanelEdges,
  NodeDetailPanelFooter,
}
