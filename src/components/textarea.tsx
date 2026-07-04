import * as React from 'react'
import { cn } from '../lib/utils'

/**
 * Wireweave UI Textarea
 * 시맨틱 변수 기반으로 리팩토링
 */

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // 시맨틱 변수 사용: bg-card, border-input, text-foreground
          'border-input bg-card text-foreground flex min-h-[80px] w-full rounded-lg border px-3.5 py-2.5 text-sm',
          // 시맨틱 변수 사용: text-text-placeholder
          'placeholder:text-text-placeholder',
          // transition
          'transition-all',
          // focus: 시맨틱 변수 사용: border-input-focus, ring-ring
          'focus:border-input-focus focus:ring-ring/10 focus:ring-[3px] focus:outline-none',
          // disabled: 시맨틱 변수 사용: bg-muted
          'disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-50',
          // resize
          'resize-y',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
