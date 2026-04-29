'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

/**
 * Wireweave UI StatCard
 * 시맨틱 변수 + 팔레트 변수 기반으로 리팩토링
 */

// ============================================
// StatCard Icon Variants (팔레트 변수 사용)
// ============================================

const statCardIconVariants = cva('rounded-lg p-3', {
  variants: {
    color: {
      blue: 'bg-[var(--color-blue-500)]/10 text-[var(--color-blue-500)]',
      green: 'bg-[var(--color-green-500)]/10 text-[var(--color-green-500)]',
      purple: 'bg-[var(--color-violet-500)]/10 text-[var(--color-violet-500)]',
      amber: 'bg-[var(--color-amber-500)]/10 text-[var(--color-amber-600)]',
      red: 'bg-[var(--color-red-500)]/10 text-[var(--color-red-500)]',
      gray: 'bg-[var(--color-muted)] text-[var(--color-muted-foreground)]',
    },
  },
  defaultVariants: {
    color: 'blue',
  },
});

// ============================================
// StatCard
// ============================================

type StatCardColor = 'blue' | 'green' | 'purple' | 'amber' | 'red' | 'gray';

interface StatCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconColor?: StatCardColor;
  change?: {
    value: string | number;
    trend: 'up' | 'down' | 'neutral';
  };
  footer?: React.ReactNode;
}

export function StatCard({
  className,
  title,
  value,
  description,
  icon: Icon,
  iconColor = 'blue',
  change,
  footer,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(
        'bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-5',
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className={statCardIconVariants({ color: iconColor })}>
            <Icon className="h-6 w-6" />
          </div>
        )}
        <div className="flex-1">
          <p className="text-[13px] text-[var(--color-muted-foreground)] mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-[28px] font-bold text-[var(--color-foreground)] leading-none">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {description && (
              <span className="text-sm text-[var(--color-muted-foreground)]">{description}</span>
            )}
          </div>
          {change && (
            <p
              className={cn(
                'text-[13px] mt-2',
                change.trend === 'up' && 'text-[var(--color-green-500)]',
                change.trend === 'down' && 'text-[var(--color-red-500)]',
                change.trend === 'neutral' && 'text-[var(--color-muted-foreground)]'
              )}
            >
              {change.trend === 'up' && '+'}
              {change.value}
            </p>
          )}
        </div>
      </div>
      {/* 시맨틱 변수 사용: border-border */}
      {footer && <div className="mt-4 pt-4 border-t border-border">{footer}</div>}
    </div>
  );
}

// ============================================
// StatCardGrid
// ============================================

interface StatCardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
}

export function StatCardGrid({
  className,
  columns = 4,
  children,
  ...props
}: StatCardGridProps) {
  return (
    <div
      className={cn(
        'grid gap-4',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-1 sm:grid-cols-2',
        columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
