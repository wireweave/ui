'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '../lib/utils'

/**
 * Wireweave UI Tabs
 * 시맨틱 변수 기반으로 리팩토링
 */

const Tabs = TabsPrimitive.Root

export type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // 시맨틱 변수 사용: border-border
      'border-border flex gap-0 border-b',
      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

export type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // padding, font
      'inline-flex items-center justify-center px-5 py-3 text-sm font-medium whitespace-nowrap',
      // 시맨틱 변수 사용: text-muted-foreground, hover:text-foreground
      'text-muted-foreground hover:text-foreground',
      // background transparent
      'border-none bg-transparent',
      // transition
      'transition-all',
      // active: primary color
      'data-[state=active]:text-primary relative',
      'after:absolute after:right-0 after:bottom-[-1px] after:left-0 after:h-0.5 after:bg-transparent after:transition-colors',
      'data-[state=active]:after:bg-primary',
      // focus — WCAG 2.4.7: `outline-none` alone removed the only visible focus
      // indicator for keyboard users. Replace with an inset semantic ring.
      'focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none focus-visible:ring-inset',
      // disabled
      'disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

export type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      // 시맨틱 변수 사용: text-muted-foreground
      'text-muted-foreground pt-6 focus-visible:outline-none',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
