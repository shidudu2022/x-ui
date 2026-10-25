import { useMemo, useState } from 'react'
import {
  Badge,
  Button,
  DataTable,
  ListFilterBar,
  Muted,
  Tag,
  TagGroup,
  Text,
  useToast,
  type DataTableColumn,
} from '@/components/ui'
import { type ClusterRow, filterFlat, FLAT_SEED } from './listSeed'

export function ListTableTemplate({
  q,
  onClear,
  sortable = true,
}: {
  q: string
  onClear: () => void
  /** When false, headers have no sort controls */
  sortable?: boolean
}) {
  const { toast } = useToast()
  const [selected, setSelected] = useState<string[]>([])
  const filtered = filterFlat(FLAT_SEED, q)

  const columns = useMemo((): DataTableColumn<ClusterRow>[] => {
    const cols: DataTableColumn<ClusterRow>[] = [
      {
        key: 'name',
        header: '名称',
        sortable,
        sortValue: (r) => r.name,
        render: (r) => (
          <>
            <Text variant="strong">{r.name}</Text>
            <Muted as="div" style={{ marginTop: 2 }}>
              {r.note}
            </Muted>
          </>
        ),
      },
      {
        key: 'status',
        header: '状态',
        sortable,
        sortValue: (r) => r.status,
        render: (r) => (
          <Badge
            tone={
              r.status === 'running' ? 'success' : r.status === 'degraded' ? 'warn' : 'neutral'
            }
          >
            {r.status}
          </Badge>
        ),
      },
      {
        key: 'version',
        header: '版本',
        sortable,
        sortValue: (r) => r.version,
        render: (r) => <span className="mono">{r.version}</span>,
      },
      {
        key: 'nodes',
        header: '节点',
        sortable,
        sortValue: (r) => r.nodes,
        render: (r) => r.nodes,
      },
      {
        key: 'tags',
        header: '标签',
        render: (r) => (
          <TagGroup>
            {r.tags.map((t) => (
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
        render: (r) => (
          <div className="actions" onClick={(e) => e.stopPropagation()}>
            <Button size="sm" onClick={() => toast(`打开 ${r.name}`, 'info')}>
              打开
            </Button>
            <Button size="sm" onClick={() => toast(`诊断 ${r.name}（示例）`, 'success')}>
              诊断
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => toast(`删除 ${r.name}（示例）`, 'error')}
            >
              删除
            </Button>
          </div>
        ),
      },
    ]
    return cols
  }, [sortable, toast])

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
        columnVisibility
        resizableColumns
        selectedKeys={selected}
        onSelectedKeysChange={setSelected}
        bulkActions={
          <>
            <Button size="sm" onClick={() => toast(`批量诊断 ${selected.length} 个`, 'info')}>
              批量诊断
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                toast(`批量删除 ${selected.length} 个（示例）`, 'warn')
                setSelected([])
              }}
            >
              批量删除
            </Button>
          </>
        }
        emptyTitle={q ? '无匹配集群' : '还没有集群'}
        emptyDesc={
          q ? `没有与「${q}」匹配的集群，可清除筛选后重试。` : '先添加服务器，再创建集群。'
        }
        emptyAction={
          q ? undefined : (
            <Button variant="primary" onClick={() => toast('打开创建流程（示例）', 'info')}>
              创建集群
            </Button>
          )
        }
        onRowClick={(r) => toast(`打开 ${r.name}`, 'info')}
        columns={columns}
      />
    </>
  )
}
