/**
 * d3-force-3d 는 타입 선언을 배포하지 않는다 (@types 패키지도 없음).
 * 그래프 레이아웃 계산에 실제 사용하는 표면만 최소 선언한다.
 * forceSimulation 의 두 번째 인자(numDimensions)로 2D/3D 를 전환한다.
 */
declare module 'd3-force-3d' {
  export interface SimulationNodeDatum {
    index?: number
    x?: number
    y?: number
    z?: number
    vx?: number
    vy?: number
    vz?: number
    fx?: number | null
    fy?: number | null
    fz?: number | null
  }

  export interface ForceLink<NodeDatum, LinkDatum> {
    (alpha: number): void
    id(accessor: (node: NodeDatum) => string): this
    distance(distance: number | ((link: LinkDatum) => number)): this
    strength(strength: number | ((link: LinkDatum) => number)): this
  }

  export interface ForceManyBody {
    (alpha: number): void
    strength(strength: number): this
  }

  export interface ForceCenter {
    (alpha: number): void
  }

  export interface Simulation<NodeDatum extends SimulationNodeDatum> {
    tick(iterations?: number): this
    stop(): this
    force(name: string, force: ForceLink<NodeDatum, unknown> | ForceManyBody | ForceCenter): this
    alpha(alpha: number): this
    nodes(): NodeDatum[]
  }

  export function forceSimulation<NodeDatum extends SimulationNodeDatum>(
    nodes: NodeDatum[],
    numDimensions?: number,
  ): Simulation<NodeDatum>

  export function forceLink<NodeDatum, LinkDatum>(
    links: LinkDatum[],
  ): ForceLink<NodeDatum, LinkDatum>

  export function forceManyBody(): ForceManyBody

  export function forceCenter(x?: number, y?: number, z?: number): ForceCenter
}
