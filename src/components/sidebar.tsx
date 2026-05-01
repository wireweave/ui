'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

/**
 * Wireweave UI Sidebar
 *
 * 페이지 배경과 항상 반대 톤을 유지한다.
 * - 라이트 페이지(밝은 bg) → 다크 사이드바
 * - 다크 페이지(어두운 bg) → 라이트 사이드바
 *
 * 모든 색상은 `--color-sidebar-*` 시맨틱 토큰을 통해서만 적용된다.
 * 컴포넌트 내부에서 팔레트 변수, hex, Tailwind 팔레트 utility 직접 사용 금지.
 */

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

export function SidebarProvider({ children, defaultCollapsed = false }: SidebarProviderProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsedWidth?: string;
  expandedWidth?: string;
}

export function Sidebar({
  className,
  children,
  collapsedWidth = 'w-16',
  expandedWidth = 'w-60',
  ...props
}: SidebarProps) {
  const { collapsed } = useSidebar();

  return (
    <aside
      className={cn(
        'hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-200',
        collapsed ? collapsedWidth : expandedWidth,
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-col rounded-xl m-2 bg-[var(--color-sidebar)] text-[var(--color-sidebar-foreground)]">
        {children}
      </div>
    </aside>
  );
}

interface SidebarMobileProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SidebarMobile({ className, children, ...props }: SidebarMobileProps) {
  const { mobileOpen, setMobileOpen } = useSidebar();

  if (!mobileOpen) return null;

  return (
    <div className={cn('fixed inset-0 z-50 lg:hidden', className)} {...props}>
      <div
        className="fixed inset-0 bg-[var(--color-sidebar-overlay)]"
        onClick={() => setMobileOpen(false)}
      />
      <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-[var(--color-sidebar)] text-[var(--color-sidebar-foreground)]">
        {children}
      </div>
    </div>
  );
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ReactNode;
  title?: string;
  showCollapseButton?: boolean;
}

export function SidebarHeader({
  className,
  logo,
  title,
  showCollapseButton = true,
  children,
  ...props
}: SidebarHeaderProps) {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <div
      className={cn(
        'flex items-center gap-2.5 px-5 py-4',
        collapsed && 'justify-center px-2',
        className
      )}
      {...props}
    >
      {logo || (
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold flex-shrink-0 text-[var(--color-primary-foreground)]"
          style={{
            backgroundImage:
              'linear-gradient(to bottom right, var(--color-sidebar-logo-from), var(--color-sidebar-logo-to))',
          }}
        >
          {title ? title.charAt(0).toUpperCase() : 'W'}
        </div>
      )}
      {!collapsed && title && (
        <span className="text-[var(--color-sidebar-foreground)] font-semibold text-base">
          {title}
        </span>
      )}
      {children}
      {showCollapseButton && !collapsed && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1.5 rounded-md text-[var(--color-sidebar-foreground-muted)] hover:bg-[var(--color-sidebar-hover)] hover:text-[var(--color-sidebar-foreground)] transition-colors"
          title="Collapse sidebar"
        >
          <PanelLeftClose className="h-4 w-4" />
        </button>
      )}
      {showCollapseButton && collapsed && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-0 translate-x-1/2 p-1.5 rounded-md bg-[var(--color-sidebar-hover)] text-[var(--color-sidebar-foreground)] hover:bg-[var(--color-sidebar-active)] transition-colors"
          title="Expand sidebar"
        >
          <PanelLeftOpen className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, children, ...props }: SidebarContentProps) {
  return (
    <nav className={cn('flex flex-1 flex-col px-3 py-2 overflow-y-auto', className)} {...props}>
      <div className="flex-1 space-y-1">{children}</div>
    </nav>
  );
}

interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function SidebarSection({ className, title, children, ...props }: SidebarSectionProps) {
  const { collapsed } = useSidebar();

  return (
    <div className={cn('py-2', className)} {...props}>
      {title && !collapsed && (
        <p className="px-3 mb-2 text-[11px] font-semibold text-[var(--color-sidebar-foreground-muted)] uppercase tracking-wider">
          {title}
        </p>
      )}
      <ul className="space-y-1">{children}</ul>
    </div>
  );
}

const sidebarItemVariants = cva(
  'flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all',
  {
    variants: {
      active: {
        true: 'bg-[var(--color-sidebar-active)] text-[var(--color-sidebar-active-foreground)]',
        false:
          'text-[var(--color-sidebar-foreground)] hover:bg-[var(--color-sidebar-hover)]',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

interface SidebarItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof sidebarItemVariants> {
  icon?: React.ComponentType<{ className?: string }>;
  as?: React.ElementType;
}

export function SidebarItem({
  className,
  active,
  icon: Icon,
  children,
  as: Component = 'a',
  ...props
}: SidebarItemProps) {
  const { collapsed } = useSidebar();

  return (
    <li>
      <Component
        className={cn(
          sidebarItemVariants({ active }),
          collapsed ? 'justify-center px-2' : 'gap-2.5',
          className
        )}
        title={collapsed && typeof children === 'string' ? children : undefined}
        {...props}
      >
        {Icon && <Icon className="h-[18px] w-[18px] flex-shrink-0 opacity-80" />}
        {!collapsed && children}
      </Component>
    </li>
  );
}

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({ className, children, ...props }: SidebarFooterProps) {
  return (
    <div className={cn('mt-auto p-3', className)} {...props}>
      {children}
    </div>
  );
}

interface SidebarUserProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  email?: string;
  avatarUrl?: string;
  avatarFallback?: string;
}

export function SidebarUser({
  className,
  name,
  email,
  avatarUrl,
  avatarFallback,
  ...props
}: SidebarUserProps) {
  const { collapsed } = useSidebar();

  const initials =
    avatarFallback ||
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  if (collapsed) return null;

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-3 py-3 border-t border-[var(--color-sidebar-border)]',
        className
      )}
      {...props}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="h-9 w-9 rounded-full object-cover" />
      ) : (
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium text-[var(--color-primary-foreground)]"
          style={{
            backgroundImage:
              'linear-gradient(to bottom right, var(--color-sidebar-logo-from), var(--color-sidebar-logo-to))',
          }}
        >
          {initials}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--color-sidebar-foreground)] truncate">
          {name}
        </p>
        {email && name !== email && (
          <p className="text-xs text-[var(--color-sidebar-foreground-muted)] truncate">{email}</p>
        )}
      </div>
    </div>
  );
}

interface SidebarMainProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsedWidth?: string;
  expandedWidth?: string;
}

export function SidebarMain({
  className,
  children,
  collapsedWidth = 'lg:pl-20',
  expandedWidth = 'lg:pl-64',
  ...props
}: SidebarMainProps) {
  const { collapsed } = useSidebar();

  return (
    <div
      className={cn(
        'flex-1 flex flex-col min-w-0 transition-all duration-200',
        collapsed ? collapsedWidth : expandedWidth,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface SidebarMobileHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  menuIcon?: React.ReactNode;
}

export function SidebarMobileHeader({
  className,
  title,
  menuIcon,
  children,
  ...props
}: SidebarMobileHeaderProps) {
  const { setMobileOpen } = useSidebar();

  return (
    <div
      className={cn(
        'sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-[var(--color-border)] bg-[var(--color-card)] px-4 lg:hidden',
        className
      )}
      {...props}
    >
      <button
        onClick={() => setMobileOpen(true)}
        className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
      >
        {menuIcon}
      </button>
      {title && (
        <span className="text-base font-semibold text-[var(--color-foreground)]">{title}</span>
      )}
      {children}
    </div>
  );
}
