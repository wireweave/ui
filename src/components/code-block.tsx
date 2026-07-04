'use client'

import * as React from 'react'
import { cn } from '../lib/utils'

/**
 * CodeBlock Component
 * Mac-style window with syntax highlighted code.
 * 하드코딩된 hex 는 GitHub editor 톤(#24292e 등)을 의도적으로 고정한 값 — 라이트/다크 무관 항상 동일한 IDE 스킨.
 */

interface CodeBlockProps {
  children: React.ReactNode
  filename?: string
  className?: string
}

export function CodeBlock({ children, filename, className }: CodeBlockProps) {
  return (
    <div className={cn('flex h-full flex-col overflow-hidden rounded-xl bg-[#24292e]', className)}>
      {/* Mac-style window header */}
      <div className="flex flex-shrink-0 items-center gap-2 border-b border-[#1b1f23] bg-[#1f2428] px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        {filename && <span className="ml-2 text-sm text-[#8b949e]">{filename}</span>}
      </div>
      {/* Code content */}
      <div className="code-block-content min-h-0 flex-1">{children}</div>
    </div>
  )
}

interface CodeBlockHeaderProps {
  filename?: string
  className?: string
}

export function CodeBlockHeader({ filename, className }: CodeBlockHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 border-b border-[#1b1f23] bg-[#1f2428] px-4 py-3',
        className,
      )}
    >
      <div className="flex gap-1.5">
        <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
      </div>
      {filename && <span className="ml-2 text-sm text-[#8b949e]">{filename}</span>}
    </div>
  )
}
