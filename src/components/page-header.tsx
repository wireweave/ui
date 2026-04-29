'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

/**
 * Wireweave UI PageHeader
 * 시맨틱 변수 기반으로 리팩토링
 */

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({
  className,
  title,
  description,
  actions,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between', className)} {...props}>
      <div>
        {/* 시맨틱 변수 사용: text-foreground */}
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {description && (
          // 시맨틱 변수 사용: text-muted-foreground
          <p className="mt-1 text-base text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
      {children}
    </div>
  );
}

interface PageSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function PageSection({
  className,
  title,
  description,
  children,
  ...props
}: PageSectionProps) {
  return (
    <section className={cn('space-y-4', className)} {...props}>
      {(title || description) && (
        <div>
          {/* 시맨틱 변수 사용: text-foreground, text-muted-foreground */}
          {title && <h2 className="text-lg font-semibold text-foreground">{title}</h2>}
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
