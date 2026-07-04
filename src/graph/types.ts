/**
 * SSOT 그래프 소프트 계약 — @wireweave/ssot-* 패키지의 타입이 확정되면
 * 이 인터페이스를 그 구조와 호환되게 정렬한다 (구조적 서브타입 유지).
 */

/** SSOT 그래프의 노드. `kind` 는 SSOT 노드 종류 (Platform, Decision, Screen 등). */
export interface GraphNode {
  id: string
  kind: string
  label: string
  [key: string]: unknown
}

/** SSOT 그래프의 방향 링크. source/target 은 노드 id. */
export interface GraphLink {
  source: string
  target: string
  kind?: string
}

/** SsotGraph3D 가 소비하는 그래프 데이터 형태. */
export interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}
