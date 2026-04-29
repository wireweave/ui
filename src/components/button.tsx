import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

/**
 * Wireweave UI Button
 * CVA + Tailwind arbitrary CSS variable 패턴
 */

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 rounded-lg shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 ring-offset-[var(--color-ring-offset)]',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--color-card)] text-[var(--color-card-foreground)] border border-[var(--color-border)] hover:bg-[var(--color-secondary)]',
        primary:
          'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] border border-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]',
        gradient:
          'bg-gradient-to-br from-[var(--color-blue-500)] to-[var(--color-violet-500)] text-white border-0',
        success:
          'bg-[var(--color-success)] text-[var(--color-success-foreground)] border border-[var(--color-success)] hover:bg-[var(--color-success-hover)]',
        warning:
          'bg-[var(--color-warning)] text-[var(--color-warning-foreground)] border border-[var(--color-warning)] hover:bg-[var(--color-warning-hover)]',
        danger:
          'bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] border border-[var(--color-destructive)] hover:bg-[var(--color-destructive-hover)]',
        destructive:
          'bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] border border-[var(--color-destructive)] hover:bg-[var(--color-destructive-hover)]',
        outline:
          'bg-transparent text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-[var(--color-accent)]',
        secondary:
          'bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] border border-[var(--color-border)] hover:bg-[var(--color-secondary-hover)]',
        ghost:
          'bg-transparent text-[var(--color-muted-foreground)] border-0 shadow-none hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)]',
        link:
          'bg-transparent text-[var(--color-primary)] border-0 shadow-none underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3.5 py-2 text-[13px]',
        default: 'h-10 px-[18px] py-2.5 text-sm',
        lg: 'h-11 px-6 py-3 text-[15px]',
        icon: 'h-9 w-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
