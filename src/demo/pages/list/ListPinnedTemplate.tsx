import { useState } from 'react'
import {
  Badge,
  Button,
  DataTable,
  ListFilterBar,
  Muted,
  Tag,
  TagGroup,
  Text,
  CellStack,
  emptyCell,
  useToast,
  type DataTableColumn,
} from '@/components/ui'
import { type ClusterRow, filterFlat, FLAT_SEED } from './listSeed'

type PinnedRow = ClusterRow & {
  region: string
  owner: string
  cpu: string
  mem: string
  updated: string
}

/** Extra middle columns so horizontal scroll makes pinned edges obvious. */
function padRow(r: ClusterRow, i: number): PinnedRow {
  return {
    ...r,
    region: ['cn-east', 'cn-north', 'ap-se'][i % 3]!,
    owner: ['alice', 'bob', 'cara'][i % 3]!,
    cpu: `${20 + (i % 7) * 8}%`,
    mem: `${30 + (i % 5) * 10}%`,
    updated: `2026-10-${String((i % 27) + 1).padStart(2, '0')}`,
  }
}

export function ListPinnedTemplate({ q, onClear }: { q: string; onClear: () => void }) {
  const { toast } = useToast()
  const [selected, setSelected] = useState<string[]>([])
  const filtered = filterFlat(FLAT_SEED, q).map(padRow)

  const columns: DataTableColumn<PinnedRow>[] = [
    {
      key: 'name',
      header: '名称',
      pinned: 'left',
      width: 180,
      sortable: true,
      sortValue: (r) => r.name,
      render: (r) => (
        <CellStack>
          <Text variant="strong" title={r.name}>
            {r.name}
          </Text>
          <Muted as="div" title={r.note || undefined}>
            {emptyCell(r.note)}
          </Muted>
        </CellStack>
      ),
    },
    {
      key: 'status',
      header: '状态',
      width: 110,
      render: (r) => (
        <Badge
          tone={r.status === 'running' ? 'success' : r.status === 'degraded' ? 'warn' : 'neutral'}
        >
          {r.status}
        </Badge>
      ),
    },
    {
      key: 'region',
      header: '区域',
      width: 120,
      render: (r) => <span className="mono">{r.region}</span>,
    },
    {
      key: 'owner',
      header: '负责人',
      width: 100,
      render: (r) => r.owner,
    },
    {
      key: 'version',
      header: '版本',
      width: 140,
      render: (r) => <span className="mono">{r.version}</span>,
    },
    {
      key: 'nodes',
      header: '节点',
      width: 80,
      render: (r) => r.nodes,
    },
    {
      key: 'cpu',
      header: 'CPU',
      width: 80,
      render: (r) => r.cpu,
    },
    {
      key: 'mem',
      header: '内存',
      width: 80,
      render: (r) => r.mem,
    },
    {
      key: 'updated',
      header: '更新',
      width: 120,
      render: (r) => <span className="mono">{r.updated}</span>,
    },
    {
      key: 'tags',
      header: '标签',
      width: 140,
      render: (r) => (
        <TagGroup>
          {r.tags
            .filter((t) => t.trim())
            .map((t) => (
              <Tag key={t} tone="neutral">
                {t}
              </Tag>
            ))}
        </TagGroup>
      ),
    },
    {
      key: 'actions',
      header: '操作',
      pinned: 'right',
      width: 200,
      emptyPlaceholder: false,
      render: (r) => (
        <div className="actions" onClick={(e) => e.stopPropagation()}>
          <Button size="sm" onClick={() => toast(`打开 ${r.name}`, 'info')}>
            打开
          </Button>
          <Button size="sm" onClick={() => toast(`诊断 ${r.name}`, 'success')}>
            诊断
          </Button>
          <Button size="sm" variant="danger" onClick={() => toast(`删除 ${r.name}`, 'error')}>
            删除
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <ListFilterBar
        query={q}
        total={FLAT_SEED.length}
        matched={filtered.length}
        unit="个"
        onClear={onClear}
      />
      <DataTable
        rows={filtered}
        rowKey={(r) => r.id}
        unit="个"
        selectedKeys={selected}
        onSelectedKeysChange={setSelected}
        bulkActions={
          <Button size="sm" onClick={() => toast(`已选 ${selected.length} 项`, 'info')}>
            批量操作
          </Button>
        }
        emptyTitle={q ? '无匹配集群' : '还没有集群'}
        emptyDesc="横向滚动时，左侧名称与右侧操作列保持固定。"
        onRowClick={(r) => toast(`打开 ${r.name}`, 'info')}
        columns={columns}
      />
    </>
  )
}
