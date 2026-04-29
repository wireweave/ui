import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

/**
 * Wireweave UI Input
 * CVA + Tailwind arbitrary CSS variable 패턴
 */

const inputVariants = cva(
  'flex w-full rounded-lg border px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--color-card)] border-[var(--color-input)] text-[var(--color-foreground)] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-input-focus)] focus:ring-[var(--color-blue-500)]/10',
        error:
          'bg-[var(--color-card)] border-[var(--color-destructive)] text-[var(--color-foreground)] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-destructive)] focus:ring-[var(--color-destructive)]/10',
      },
      size: {
        sm: 'h-8 px-3 py-1.5 text-xs',
        default: 'h-10 px-3.5 py-2.5 text-sm',
        lg: 'h-12 px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
