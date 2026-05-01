// Server-safe entrypoint. Exports utilities that must run during SSR
// (no React, no hooks, no `'use client'` boundary).

export { getThemeInitScript } from './components/theme-script';
