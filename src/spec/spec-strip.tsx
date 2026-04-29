import * as React from 'react';
import { cn } from '../lib/utils';

/**
 * Wireweave Specification Frontmatter Strip.
 *
 * Optional ornamental strip for docs/landing surfaces that want a
 * "specification document" tone — chapter / section / revision / status pill.
 *
 * Tokens consumed (--color-paper-2, --color-hairline, --color-ink,
 * --color-ink-faint, --color-signal, --color-signal-soft, --color-critical)
 * are NOT shipped by `@wireweave/ui` core theme. Consumers using `/spec`
 * must provide them in their own CSS layer (see docs site theme).
 */

export type SpecStatus = 'STABLE' | 'BETA' | 'DRAFT' | 'DEPRECATED';

const statusToneClass: Record<SpecStatus, string> = {
  STABLE: 'text-[var(--color-signal)]',
  BETA: 'text-[var(--color-signal-soft)]',
  DRAFT: 'text-[var(--color-ink-faint)]',
  DEPRECATED: 'text-[var(--color-critical)]',
};

interface SpecStripProps extends React.HTMLAttributes<HTMLDivElement> {
  chapter?: string;
  section?: string;
  revision?: string;
  status?: SpecStatus;
  trailing?: React.ReactNode;
}

const Dot = () => (
  <span className="text-[var(--color-ink-faint)] select-none">·</span>
);

export function SpecStrip({
  className,
  chapter,
  section,
  revision,
  status,
  trailing,
  ...props
}: SpecStripProps) {
  return (
    <div
      className={cn(
        'flex items-center h-9 px-4 sm:px-6 gap-3 text-[12px] leading-none',
        'bg-[var(--color-paper-2)] border-b border-[var(--color-hairline)]',
        'overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
      {...props}
    >
      {chapter && (
        <span className="font-mono text-[var(--color-ink)] tabular-nums">{chapter}</span>
      )}
      {chapter && section && <Dot />}
      {section && (
        <span className="font-semibold text-[var(--color-ink)] tracking-[0.05em] uppercase">
          {section}
        </span>
      )}
      {revision && (
        <>
          <Dot />
          <span className="bracket-tag">{revision}</span>
        </>
      )}
      {status && (
        <>
          <Dot />
          <span className={cn('bracket-tag', statusToneClass[status])}>STATUS: {status}</span>
        </>
      )}
      {trailing && (
        <>
          <span className="flex-1" />
          {trailing}
        </>
      )}
    </div>
  );
}
