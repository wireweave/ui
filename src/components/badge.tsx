import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

/**
 * Wireweave UI Badge
 * CVA + Tailwind arbitrary CSS variable 패턴
 */

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--color-muted)] text-[var(--color-muted-foreground)]',
        primary:
          'bg-[var(--color-blue-500)]/10 text-[var(--color-blue-500)]',
        blue:
          'bg-[var(--color-blue-500)]/10 text-[var(--color-blue-500)]',
        secondary:
          'bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]',
        success:
          'bg-[var(--color-green-500)]/10 text-[var(--color-green-500)]',
        green:
          'bg-[var(--color-green-500)]/10 text-[var(--color-green-500)]',
        warning:
          'bg-[var(--color-yellow-500)]/10 text-[var(--color-amber-700)]',
        yellow:
          'bg-[var(--color-yellow-500)]/10 text-[var(--color-amber-700)]',
        destructive:
          'bg-[var(--color-red-500)]/10 text-[var(--color-red-500)]',
        danger:
          'bg-[var(--color-red-500)]/10 text-[var(--color-red-500)]',
        red:
          'bg-[var(--color-red-500)]/10 text-[var(--color-red-500)]',
        purple:
          'bg-[var(--color-violet-500)]/10 text-[var(--color-violet-500)]',
        outline:
          'bg-transparent border border-[var(--color-border)] text-[var(--color-muted-foreground)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
