'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { cn } from '../lib/utils';

/**
 * Wireweave UI Theme System
 *
 * - 단일 진실 공급원: html element 의 class (`light` 또는 `dark`).
 * - 사용자 선택값(`light` / `dark` / `system`)은 localStorage 에 영속.
 * - `system` 일 때 OS prefers-color-scheme 변경에 자동 반응.
 * - SSR 안전: 초기 렌더는 `system` 가정. mount 직후 실제 값으로 동기화.
 *   FOUC 가 신경 쓰이는 host 는 head 에 inline script 를 넣어 hydration 전에 class 를 적용한다
 *   (`getThemeInitScript()` 를 사용).
 */

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'wireweave-theme';

interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  /** 초기 모드 (기본: 'system'). localStorage 가 우선. */
  defaultTheme?: ThemeMode;
  /** localStorage key 오버라이드 (기본 `wireweave-theme`). */
  storageKey?: string;
}

function readStored(storageKey: string): ThemeMode | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(storageKey);
    if (value === 'light' || value === 'dark' || value === 'system') return value;
  } catch {
    /* localStorage 접근 실패 (private mode 등) — 무시 */
  }
  return null;
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyThemeClass(resolved: ResolvedTheme, mode: ThemeMode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  if (mode === 'system') {
    /* system 모드: prefers-color-scheme 가 알아서 적용되도록 class 를 비워둔다.
       단, 이전에 강제 light 가 붙어있다가 system 으로 돌아온 경우를 대비해 위에서 제거. */
    if (resolved === 'dark') root.classList.add('dark');
    return;
  }
  root.classList.add(mode);
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<ThemeMode>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>('light');

  // mount: read storage + sync class
  React.useEffect(() => {
    const stored = readStored(storageKey) ?? defaultTheme;
    const resolved = stored === 'system' ? getSystemTheme() : stored;
    setThemeState(stored);
    setResolvedTheme(resolved);
    applyThemeClass(resolved, stored);
  }, [defaultTheme, storageKey]);

  // OS 선호 변경 추적 (system 모드일 때만)
  React.useEffect(() => {
    if (theme !== 'system') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      const resolved: ResolvedTheme = mql.matches ? 'dark' : 'light';
      setResolvedTheme(resolved);
      applyThemeClass(resolved, 'system');
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [theme]);

  const setTheme = React.useCallback(
    (next: ThemeMode) => {
      const resolved = next === 'system' ? getSystemTheme() : next;
      setThemeState(next);
      setResolvedTheme(resolved);
      applyThemeClass(resolved, next);
      try {
        window.localStorage.setItem(storageKey, next);
      } catch {
        /* 무시 */
      }
    },
    [storageKey]
  );

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}

// `getThemeInitScript` 는 `./theme-script.ts` (server-safe) 에 정의되어 있으며
// `@wireweave/ui/server` sub-export 로 공개된다 (이 모듈은 'use client' 이라 SSR 에서 호출 불가).

/**
 * Sun/Moon 토글 버튼.
 * - 클릭으로 light ↔ dark 토글 (system 은 long-press / dropdown 변형에서 노출).
 */
interface ThemeToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** light/dark/system 3-way dropdown 으로 표시할지 (기본 false: 2-way 토글). */
  withSystem?: boolean;
  size?: 'sm' | 'md';
}

export function ThemeToggle({
  className,
  withSystem = false,
  size = 'md',
  ...props
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const sizeClass = size === 'sm' ? 'h-8 w-8' : 'h-9 w-9';
  const iconClass = size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]';

  if (!withSystem) {
    const next: ResolvedTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    const label = `Switch to ${next} theme`;
    return (
      <button
        type="button"
        onClick={() => setTheme(next)}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors',
          sizeClass,
          className
        )}
        title={label}
        aria-label={label}
        {...props}
      >
        {resolvedTheme === 'dark' ? <Moon className={iconClass} /> : <Sun className={iconClass} />}
      </button>
    );
  }

  // 3-way: cycle light → dark → system → light
  const order: ThemeMode[] = ['light', 'dark', 'system'];
  const cur = order.indexOf(theme);
  const nextMode = order[(cur + 1) % order.length];
  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;
  const label = `Theme: ${theme}. Switch to ${nextMode}.`;

  return (
    <button
      type="button"
      onClick={() => setTheme(nextMode)}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors',
        sizeClass,
        className
      )}
      title={label}
      aria-label={label}
      {...props}
    >
      <Icon className={iconClass} />
    </button>
  );
}
