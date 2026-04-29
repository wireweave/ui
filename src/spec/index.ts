'use client';

/**
 * @wireweave/ui/spec — opt-in "specification document" ornament components.
 *
 * Reserved for docs / landing surfaces. Consumers MUST provide paper-tone
 * CSS variables (`--color-paper-2`, `--color-hairline`, `--color-ink`,
 * `--color-ink-faint`, `--color-signal`, `--color-signal-soft`,
 * `--color-critical`) in their own theme layer.
 *
 * Dashboard chrome and admin SHOULD NOT import this entry.
 */

export { SpecStrip } from './spec-strip';
export type { SpecStatus } from './spec-strip';
