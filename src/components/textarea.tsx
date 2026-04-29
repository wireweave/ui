import * as React from 'react';
import { cn } from '../lib/utils';

/**
 * Wireweave UI Textarea
 * 시맨틱 변수 기반으로 리팩토링
 */

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // 시맨틱 변수 사용: bg-card, border-input, text-foreground
          'flex min-h-[80px] w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground',
          // 시맨틱 변수 사용: text-text-placeholder
          'placeholder:text-text-placeholder',
          // transition
          'transition-all',
          // focus: 시맨틱 변수 사용: border-input-focus, ring-ring
          'focus:outline-none focus:border-input-focus focus:ring-[3px] focus:ring-ring/10',
          // disabled: 시맨틱 변수 사용: bg-muted
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
          // resize
          'resize-y',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
