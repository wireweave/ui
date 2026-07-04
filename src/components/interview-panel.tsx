'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

/**
 * Wireweave UI InterviewPanel
 * 인터뷰 UI 셸 — 순수 표시/슬롯 (LLM Q&A 로직 없음).
 * 앱이 메시지 · 질문 · 답변 UI(Input/Textarea/Button 등)를 주입한다.
 */

export interface InterviewPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible name for the region (WCAG 4.1.2). */
  label: string
}

const InterviewPanel = React.forwardRef<HTMLDivElement, InterviewPanelProps>(
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
InterviewPanel.displayName = 'InterviewPanel'

export interface InterviewPanelHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  /** Interview progress — renders "answered / total" plus a progress bar. */
  progress?: { answered: number; total: number }
}

const InterviewPanelHeader = React.forwardRef<HTMLDivElement, InterviewPanelHeaderProps>(
  ({ className, title, progress, ...props }, ref) => {
    const percent =
      progress && progress.total > 0
        ? Math.min(100, Math.max(0, (progress.answered / progress.total) * 100))
        : 0

    return (
      <div
        ref={ref}
        className={cn('flex-none border-b px-5 py-4', 'border-[var(--color-border)]', className)}
        {...props}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="truncate text-base font-semibold text-[var(--color-foreground)]">
            {title}
          </h2>
          {progress && (
            <span className="flex-none text-xs text-[var(--color-muted-foreground)]">
              {progress.answered} / {progress.total}
            </span>
          )}
        </div>
        {progress && (
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={progress.total}
            aria-valuenow={progress.answered}
            aria-label={`${progress.answered} of ${progress.total} questions answered`}
            className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-muted)]"
          >
            <div
              className="h-full rounded-full bg-[var(--color-primary)] transition-[width]"
              // dynamic geometry (not a design token) — same pattern as sidebar/canvas
              style={{ width: `${percent}%` }}
            />
          </div>
        )}
      </div>
    )
  },
)
InterviewPanelHeader.displayName = 'InterviewPanelHeader'

const InterviewMessageList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const innerRef = React.useRef<HTMLDivElement>(null)
    React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement, [])

    // 새 메시지(children 변경) 시 하단 자동 스크롤
    React.useEffect(() => {
      const el = innerRef.current
      if (el) el.scrollTop = el.scrollHeight
    }, [children])

    return (
      <div
        ref={innerRef}
        role="log"
        aria-live="polite"
        className={cn('flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 py-4', className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
InterviewMessageList.displayName = 'InterviewMessageList'

const interviewMessageVariants = cva(
  'max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed',
  {
    variants: {
      from: {
        agent:
          'self-start rounded-bl-sm border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-card-foreground)] shadow-sm',
        user: 'self-end rounded-br-sm bg-[var(--color-primary)] text-[var(--color-primary-foreground)]',
      },
    },
    defaultVariants: {
      from: 'agent',
    },
  },
)

export interface InterviewMessageProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof interviewMessageVariants> {}

const InterviewMessage = React.forwardRef<HTMLDivElement, InterviewMessageProps>(
  ({ className, from, ...props }, ref) => (
    <div ref={ref} className={cn(interviewMessageVariants({ from, className }))} {...props} />
  ),
)
InterviewMessage.displayName = 'InterviewMessage'

export interface InterviewQuestionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  question: string
  hint?: string
  /** App-owned action slot (skip / next buttons, …). */
  actions?: React.ReactNode
}

const InterviewQuestionCard = React.forwardRef<HTMLDivElement, InterviewQuestionCardProps>(
  ({ className, question, hint, actions, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border p-4 shadow-sm',
        'border-[var(--color-primary)] bg-[var(--color-card)]',
        className,
      )}
      {...props}
    >
      <p className="text-sm font-medium text-[var(--color-foreground)]">{question}</p>
      {hint && <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">{hint}</p>}
      {children != null && <div className="mt-3">{children}</div>}
      {actions != null && <div className="mt-3 flex items-center justify-end gap-2">{actions}</div>}
    </div>
  ),
)
InterviewQuestionCard.displayName = 'InterviewQuestionCard'

const InterviewPanelInput = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-none border-t px-5 py-4', 'border-[var(--color-border)]', className)}
      {...props}
    />
  ),
)
InterviewPanelInput.displayName = 'InterviewPanelInput'

export {
  InterviewPanel,
  InterviewPanelHeader,
  InterviewMessageList,
  InterviewMessage,
  InterviewQuestionCard,
  InterviewPanelInput,
}
