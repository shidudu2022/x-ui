import { matchText } from '@/lib/useListSearch'

export type ClusterRow = {
  id: string
  name: string
  note: string
  status: 'running' | 'degraded' | 'stopped'
  version: string
  nodes: number
  tags: string[]
}

export type TreeRow = {
  id: string
  name: string
  note: string
  status: 'running' | 'degraded' | 'stopped' | 'group'
  version: string
  nodes: number
  tags: string[]
  children?: TreeRow[]
}

export const FLAT_SEED: ClusterRow[] = Array.from({ length: 18 }, (_, i) => ({
  id: String(i + 1),
  name:
    i % 4 === 0
      ? `cluster-${String(i + 1).padStart(2, '0')}-apac-production-shared-control-plane`
      : `cluster-${String(i + 1).padStart(2, '0')}`,
  note:
    i % 5 === 0
      ? ''
      : i % 4 === 0
        ? '用于亚太区生产流量与灰度发布的共享控制面，备注很长时表格应单行省略而不是撑高整行'
        : i % 3 === 0
          ? '生产环境'
          : i % 3 === 1
            ? '预发'
            : '开发调试',
  status: (['running', 'degraded', 'stopped'] as const)[i % 3],
  version: i % 7 === 0 ? '' : i % 2 === 0 ? 'v1.31.3+k3s1' : 'v1.30.6+k3s1',
  nodes: 1 + (i % 5),
  tags:
    i % 5 === 0
      ? []
      : i % 4 === 0
        ? ['prod', 'edge', 'apac', 'shared', 'canary']
        : i % 2 === 0
          ? ['prod', 'edge']
          : i % 3 === 0
            ? ['', '  ']
            : ['dev'],
}))

export const TREE_SEED: TreeRow[] = [
  {
    id: 'ns-prod',
    name: 'production',
    note: '生产命名空间',
    status: 'group',
    version: '—',
    nodes: 0,
    tags: ['prod'],
    children: FLAT_SEED.slice(0, 5).map((r, i) => ({
      ...r,
      id: `p-${i + 1}`,
      note: '生产环境',
      tags: ['prod', 'edge'],
    })),
  },
  {
    id: 'ns-staging',
    name: 'staging',
    note: '预发命名空间',
    status: 'group',
    version: '—',
    nodes: 0,
    tags: ['staging'],
    children: FLAT_SEED.slice(5, 9).map((r, i) => ({
      ...r,
      id: `s-${i + 1}`,
      name: `stg-${String(i + 1).padStart(2, '0')}`,
      note: '预发',
      tags: ['staging'],
    })),
  },
  {
    id: 'ns-dev',
    name: 'development',
    note: '开发命名空间',
    status: 'group',
    version: '—',
    nodes: 0,
    tags: ['dev'],
    children: FLAT_SEED.slice(9, 15).map((r, i) => ({
      ...r,
      id: `d-${i + 1}`,
      name: `dev-${String(i + 1).padStart(2, '0')}`,
      note: '开发调试',
      tags: ['dev'],
    })),
  },
]

export function filterFlat(rows: ClusterRow[], q: string) {
  if (!q) return rows
  return rows.filter((r) =>
    matchText(`${r.name} ${r.note} ${r.status} ${r.version} ${r.tags.join(' ')}`, q),
  )
}

function rowMatch(r: TreeRow, q: string) {
  return matchText(`${r.name} ${r.note} ${r.status} ${r.version} ${r.tags.join(' ')}`, q)
}

export function filterTree(nodes: TreeRow[], q: string): TreeRow[] {
  if (!q) return nodes
  const out: TreeRow[] = []
  for (const node of nodes) {
    const kids = node.children ? filterTree(node.children, q) : []
    if (rowMatch(node, q) || kids.length) {
      out.push({ ...node, children: kids.length ? kids : node.children })
    }
  }
  return out
}

export function countLeaves(nodes: TreeRow[]): number {
  return nodes.reduce((n, r) => n + (r.children?.length ? countLeaves(r.children) : 1), 0)
}

export const LIST_TEMPLATES = [
  { id: 'sortable', label: '可排序表格' },
  { id: 'static', label: '不可排序表格' },
  { id: 'pinned', label: '固定列' },
  { id: 'tree', label: '树状分组' },
  { id: 'cards', label: '卡片网格' },
  { id: 'compact', label: '紧凑列表' },
  { id: 'resource', label: 'ResourceList' },
] as const

export type ListTemplateId = (typeof LIST_TEMPLATES)[number]['id']

/** Accept legacy `?tpl=table` as sortable */
export function parseListTemplateId(v: string | null): ListTemplateId {
  if (v === 'table') return 'sortable'
  if (LIST_TEMPLATES.some((t) => t.id === v)) return v as ListTemplateId
  return 'sortable'
}
