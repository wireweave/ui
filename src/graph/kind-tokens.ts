/**
 * SSOT 노드 kind → 시맨틱 토큰 매핑 (3D/2D 공용 단일 소스).
 * 팔레트 변수 직접 참조 금지 — 반드시 시맨틱 계층만 사용한다.
 *
 * - `token`: WebGL 경로(3D)에서 resolveSemanticColors 로 계산값 해석에 사용.
 * - `dotClass`: DOM 경로(2D)에서 Tailwind arbitrary 클래스로 사용 —
 *   Tailwind 는 리터럴 문자열만 스캔하므로 `bg-[var(${token})]` 동적 조합 대신
 *   같은 토큰을 가리키는 리터럴을 나란히 둔다 (필드 인접으로 정합 유지).
 */
export interface KindStyle {
  token: string
  dotClass: string
}

const KIND_STYLES: Record<string, KindStyle> = {
  Platform: { token: '--color-foreground', dotClass: 'bg-[var(--color-foreground)]' },
  Persona: { token: '--color-sidebar-logo-to', dotClass: 'bg-[var(--color-sidebar-logo-to)]' },
  Domain: { token: '--color-primary-hover', dotClass: 'bg-[var(--color-primary-hover)]' },
  Concept: { token: '--color-text-placeholder', dotClass: 'bg-[var(--color-text-placeholder)]' },
  Capability: { token: '--color-success-hover', dotClass: 'bg-[var(--color-success-hover)]' },
  SystemComponent: {
    token: '--color-text-secondary',
    dotClass: 'bg-[var(--color-text-secondary)]',
  },
  Integration: { token: '--color-warning', dotClass: 'bg-[var(--color-warning)]' },
  Invariant: { token: '--color-destructive', dotClass: 'bg-[var(--color-destructive)]' },
  Decision: { token: '--color-primary', dotClass: 'bg-[var(--color-primary)]' },
  Screen: { token: '--color-success', dotClass: 'bg-[var(--color-success)]' },
  Endpoint: { token: '--color-warning-hover', dotClass: 'bg-[var(--color-warning-hover)]' },
  Flow: { token: '--color-destructive-hover', dotClass: 'bg-[var(--color-destructive-hover)]' },
}

const DEFAULT_KIND_STYLE: KindStyle = {
  token: '--color-muted-foreground',
  dotClass: 'bg-[var(--color-muted-foreground)]',
}

export const KIND_TOKENS: string[] = [
  ...Object.values(KIND_STYLES).map((s) => s.token),
  DEFAULT_KIND_STYLE.token,
]

export function kindStyle(kind: string): KindStyle {
  return KIND_STYLES[kind] ?? DEFAULT_KIND_STYLE
}
