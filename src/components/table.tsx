'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

/**
 * Wireweave UI Table
 * Tailwind arbitrary CSS variable 패턴
 */

// ============================================
// Table Wrapper (card-style container)
// ============================================

interface TableWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TableWrapper({ className, children, ...props }: TableWrapperProps) {
  return (
    <div
      className={cn(
        'border rounded-xl overflow-hidden',
        'bg-[var(--color-card)] border-[var(--color-border)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ============================================
// Table
// ============================================

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

export function Table({ className, children, ...props }: TableProps) {
  return (
    <TableWrapper>
      <div className="overflow-x-auto">
        <table
          className={cn('w-full border-collapse', className)}
          {...props}
        >
          {children}
        </table>
      </div>
    </TableWrapper>
  );
}

// ============================================
// TableHeader
// ============================================

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function TableHeader({ className, children, ...props }: TableHeaderProps) {
  return (
    <thead
      className={cn(
        'bg-[var(--color-muted)]',
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
}

// ============================================
// TableBody
// ============================================

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function TableBody({ className, children, ...props }: TableBodyProps) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
}

// ============================================
// TableRow
// ============================================

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  hoverable?: boolean;
}

export function TableRow({
  className,
  hoverable = true,
  children,
  ...props
}: TableRowProps) {
  return (
    <tr
      className={cn(
        'border-b last:border-b-0 transition-colors',
        'border-[var(--color-border)]',
        hoverable && 'hover:bg-[var(--color-muted)]',
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

// ============================================
// TableHead
// ============================================

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

export function TableHead({ className, children, ...props }: TableHeadProps) {
  return (
    <th
      className={cn(
        'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide',
        'text-[var(--color-muted-foreground)]',
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

// ============================================
// TableCell
// ============================================

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export function TableCell({ className, children, ...props }: TableCellProps) {
  return (
    <td
      className={cn(
        'px-4 py-3 text-sm',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

// ============================================
// TableCellText (common text styling)
// ============================================

const tableCellTextVariants = cva(
  'text-sm',
  {
    variants: {
      variant: {
        default: 'text-[var(--color-foreground)]',
        muted: 'text-[var(--color-muted-foreground)]',
        primary: 'font-medium text-[var(--color-foreground)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface TableCellTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tableCellTextVariants> {}

export function TableCellText({
  className,
  variant,
  children,
  ...props
}: TableCellTextProps) {
  return (
    <span
      className={cn(tableCellTextVariants({ variant, className }))}
      {...props}
    >
      {children}
    </span>
  );
}

// ============================================
// TableActions (right-aligned actions cell)
// ============================================

interface TableActionsProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export function TableActions({ className, children, ...props }: TableActionsProps) {
  return (
    <td
      className={cn('px-4 py-3 text-right', className)}
      {...props}
    >
      <div className="flex items-center justify-end gap-2">{children}</div>
    </td>
  );
}
