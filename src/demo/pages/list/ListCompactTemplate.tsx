import {
  Badge,
  Button,
  DataTable,
  ListFilterBar,
  Text,
  useToast,
} from '@/components/ui'
import { filterFlat, FLAT_SEED, type ClusterRow } from './listSeed'

/** Dense table — fewer columns, sm controls, higher page size. */
export function ListCompactTemplate({ q, onClear }: { q: string; onClear: () => void }) {
  const { toast } = useToast()
  const filtered = filterFlat(FLAT_SEED, q)

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
        defaultPageSize={20}
        pageSizeOptions={[10, 20, 50, 100]}
        emptyTitle={q ? '无匹配项' : '暂无数据'}
        onRowClick={(r) => toast(`打开 ${r.name}`, 'info')}
        columns={[
          {
            key: 'name',
            header: '名称',
            render: (r: ClusterRow) => <Text variant="strong">{r.name}</Text>,
          },
          {
            key: 'status',
            header: '状态',
            render: (r: ClusterRow) => (
              <Badge
                tone={
                  r.status === 'running'
                    ? 'success'
                    : r.status === 'degraded'
                      ? 'warn'
                      : 'neutral'
                }
              >
                {r.status}
              </Badge>
            ),
          },
          {
            key: 'nodes',
            header: '节点',
            render: (r: ClusterRow) => r.nodes,
          },
          {
            key: 'actions',
            header: '',
            render: (r) => (
              <div className="actions" onClick={(e) => e.stopPropagation()}>
                <Button size="sm" onClick={() => toast(`打开 ${r.name}`, 'info')}>
                  打开
                </Button>
              </div>
            ),
          },
        ]}
      />
    </>
  )
}
