'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../lib/utils';

/**
 * Wireweave UI Tabs
 * 시맨틱 변수 기반으로 리팩토링
 */

const Tabs = TabsPrimitive.Root;

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // 시맨틱 변수 사용: border-border
      'flex gap-0 border-b border-border',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // padding, font
      'inline-flex items-center justify-center whitespace-nowrap px-5 py-3 text-sm font-medium',
      // 시맨틱 변수 사용: text-muted-foreground, hover:text-foreground
      'text-muted-foreground hover:text-foreground',
      // background transparent
      'bg-transparent border-none',
      // transition
      'transition-all',
      // active: primary color
      'relative data-[state=active]:text-primary',
      'after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-transparent after:transition-colors',
      'data-[state=active]:after:bg-primary',
      // focus
      'focus-visible:outline-none',
      // disabled
      'disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      // 시맨틱 변수 사용: text-muted-foreground
      'pt-6 text-muted-foreground focus-visible:outline-none',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
