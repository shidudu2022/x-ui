import {
  Badge,
  Button,
  DataTable,
  ListFilterBar,
  Text,
  useToast,
} from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'
import { filterFlat, FLAT_SEED, type ClusterRow } from './listSeed'

/** Dense table — fewer columns, sm controls, higher page size. */
export function ListCompactTemplate({ q, onClear }: { q: string; onClear: () => void }) {
  const t = useDemoT()
  const { toast } = useToast()
  const filtered = filterFlat(FLAT_SEED, q)

  return (
    <>
      <ListFilterBar
        query={q}
        total={FLAT_SEED.length}
        matched={filtered.length}
        unit={t('items', '个')}
        onClear={onClear}
      />
      <DataTable
        rows={filtered}
        rowKey={(r) => r.id}
        unit={t('items', '个')}
        defaultPageSize={20}
        pageSizeOptions={[10, 20, 50, 100]}
        emptyTitle={q ? t('No matches', '无匹配项') : t('No data', '暂无数据')}
        onRowClick={(r) => toast(t(`Open ${r.name}`, `打开 ${r.name}`), 'info')}
        columns={[
          {
            key: 'name',
            header: t('Name', '名称'),
            render: (r: ClusterRow) => (
              <Text variant="strong" title={r.name}>
                {r.name}
              </Text>
            ),
          },
          {
            key: 'status',
            header: t('Status', '状态'),
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
            header: t('Nodes', '节点'),
            render: (r: ClusterRow) => r.nodes,
          },
          {
            key: 'actions',
            header: '',
            emptyPlaceholder: false,
            render: (r) => (
              <div className="actions" onClick={(e) => e.stopPropagation()}>
                <Button size="sm" onClick={() => toast(t(`Open ${r.name}`, `打开 ${r.name}`), 'info')}>
                  {t('Open', '打开')}
                </Button>
              </div>
            ),
          },
        ]}
      />
    </>
  )
}
