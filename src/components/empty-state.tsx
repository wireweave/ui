'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

/**
 * Wireweave UI EmptyState
 * 시맨틱 변수 기반으로 리팩토링
 */

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'card' | 'dashed';
}

export function EmptyState({
  className,
  icon: Icon,
  title,
  description,
  action,
  variant = 'default',
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'p-8 text-center',
        // 시맨틱 변수 사용: bg-card, border-border, bg-muted
        variant === 'card' && 'bg-card border border-border rounded-xl shadow-sm',
        variant === 'dashed' && 'bg-muted rounded-xl border-2 border-dashed border-border',
        className
      )}
      {...props}
    >
      {Icon && (
        // 시맨틱 변수 사용: text-muted-foreground
        <Icon className="mx-auto h-12 w-12 text-muted-foreground" />
      )}
      {/* 시맨틱 변수 사용: text-foreground */}
      <h3 className={cn('font-semibold text-foreground', Icon ? 'mt-4 text-lg' : 'text-lg')}>
        {title}
      </h3>
      {description && (
        // 시맨틱 변수 사용: text-muted-foreground
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

interface EmptyStateActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ComponentType<{ className?: string }>;
}

export function EmptyStateAction({
  className,
  icon: Icon,
  children,
  ...props
}: EmptyStateActionProps) {
  return (
    <button
      className={cn(
        // 시맨틱 변수 사용: bg-primary, text-primary-foreground, hover:bg-primary-hover
        'inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground',
        'shadow-sm hover:bg-primary-hover transition-colors',
        className
      )}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}
