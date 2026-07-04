'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

/**
 * Wireweave UI Table
 * Tailwind arbitrary CSS variable 패턴
 */

// ============================================
// Table Wrapper (card-style container)
// ============================================

type TableWrapperProps = React.HTMLAttributes<HTMLDivElement>

export function TableWrapper({ className, children, ...props }: TableWrapperProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border',
        'border-[var(--color-border)] bg-[var(--color-card)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================
// Table
// ============================================

type TableProps = React.HTMLAttributes<HTMLTableElement>

export function Table({ className, children, ...props }: TableProps) {
  return (
    <TableWrapper>
      <div className="overflow-x-auto">
        <table className={cn('w-full border-collapse', className)} {...props}>
          {children}
        </table>
      </div>
    </TableWrapper>
  )
}

// ============================================
// TableHeader
// ============================================

type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>

export function TableHeader({ className, children, ...props }: TableHeaderProps) {
  return (
    <thead className={cn('bg-[var(--color-muted)]', className)} {...props}>
      {children}
    </thead>
  )
}

// ============================================
// TableBody
// ============================================

type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>

export function TableBody({ className, children, ...props }: TableBodyProps) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  )
}

// ============================================
// TableRow
// ============================================

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  hoverable?: boolean
}

export function TableRow({ className, hoverable = true, children, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        'border-b transition-colors last:border-b-0',
        'border-[var(--color-border)]',
        hoverable && 'hover:bg-[var(--color-muted)]',
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  )
}

// ============================================
// TableHead
// ============================================

type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>

export function TableHead({ className, children, ...props }: TableHeadProps) {
  return (
    <th
      className={cn(
        'px-4 py-3 text-left text-xs font-semibold tracking-wide uppercase',
        'text-[var(--color-muted-foreground)]',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  )
}

// ============================================
// TableCell
// ============================================

type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>

export function TableCell({ className, children, ...props }: TableCellProps) {
  return (
    <td className={cn('px-4 py-3 text-sm', className)} {...props}>
      {children}
    </td>
  )
}

// ============================================
// TableCellText (common text styling)
// ============================================

const tableCellTextVariants = cva('text-sm', {
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
})

interface TableCellTextProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tableCellTextVariants> {}

export function TableCellText({ className, variant, children, ...props }: TableCellTextProps) {
  return (
    <span className={cn(tableCellTextVariants({ variant, className }))} {...props}>
      {children}
    </span>
  )
}

// ============================================
// TableActions (right-aligned actions cell)
// ============================================

type TableActionsProps = React.TdHTMLAttributes<HTMLTableCellElement>

export function TableActions({ className, children, ...props }: TableActionsProps) {
  return (
    <td className={cn('px-4 py-3 text-right', className)} {...props}>
      <div className="flex items-center justify-end gap-2">{children}</div>
    </td>
  )
}
