'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

/**
 * Wireweave UI Alert
 * 팔레트 변수 기반으로 리팩토링
 */

const alertVariants = cva('rounded-xl p-4', {
  variants: {
    variant: {
      info: 'bg-[var(--color-blue-500)]/10 text-[var(--color-blue-700)]',
      success: 'bg-[var(--color-green-500)]/10 text-[var(--color-green-700)]',
      warning: 'bg-[var(--color-amber-500)]/10 text-[var(--color-amber-700)]',
      error: 'bg-[var(--color-red-500)]/10 text-[var(--color-red-700)]',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

const alertIconColors = {
  info: 'text-[var(--color-blue-500)]',
  success: 'text-[var(--color-green-500)]',
  warning: 'text-[var(--color-amber-500)]',
  error: 'text-[var(--color-red-500)]',
};

const alertIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  icon?: React.ComponentType<{ className?: string }>;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function Alert({
  className,
  variant = 'info',
  title,
  icon,
  dismissible = false,
  onDismiss,
  children,
  ...props
}: AlertProps) {
  const Icon = icon || alertIcons[variant || 'info'];
  const iconColor = alertIconColors[variant || 'info'];

  return (
    <div className={cn(alertVariants({ variant }), className)} role="alert" {...props}>
      <div className="flex items-start gap-3">
        <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconColor)} />
        <div className="flex-1 min-w-0">
          {title && <p className="font-medium">{title}</p>}
          <div className={cn('text-sm', title && 'mt-1')}>{children}</div>
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="rounded p-1 hover:bg-black/5 transition-colors flex-shrink-0"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

interface AlertInlineProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'error' | 'warning' | 'success' | 'info';
}

export function AlertInline({
  className,
  variant = 'error',
  children,
  ...props
}: AlertInlineProps) {
  const colors = {
    error: 'text-[var(--color-red-600)]',
    warning: 'text-[var(--color-amber-600)]',
    success: 'text-[var(--color-green-600)]',
    info: 'text-[var(--color-blue-600)]',
  };

  return (
    <p className={cn('text-sm', colors[variant], className)} {...props}>
      {children}
    </p>
  );
}
