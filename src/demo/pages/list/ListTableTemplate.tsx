import { useMemo, useState } from 'react'
import {
  Badge,
  Button,
  CellStack,
  DataTable,
  ListFilterBar,
  Muted,
  Tag,
  TagGroup,
  Text,
  emptyCell,
  useToast,
  type DataTableColumn,
} from '@/components/ui'
import { useLocale } from '@/i18n'
import { useDemoT } from '@/demo/i18n/useDemoT'
import { type ClusterRow, filterFlat, FLAT_SEED, rowNote } from './listSeed'

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
  const t = useDemoT()
  const { locale } = useLocale()
  const { toast } = useToast()
  const [selected, setSelected] = useState<string[]>([])
  const filtered = filterFlat(FLAT_SEED, q)

  const columns = useMemo((): DataTableColumn<ClusterRow>[] => {
    const cols: DataTableColumn<ClusterRow>[] = [
      {
        key: 'name',
        header: t('Name', '名称'),
        sortable,
        sortValue: (r) => r.name,
        render: (r) => {
          const note = rowNote(locale, r.note)
          return (
            <CellStack>
              <Text variant="strong" title={r.name}>
                {r.name}
              </Text>
              <Muted as="div" title={note || undefined}>
                {emptyCell(note)}
              </Muted>
            </CellStack>
          )
        },
      },
      {
        key: 'status',
        header: t('Status', '状态'),
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
        header: t('Version', '版本'),
        sortable,
        sortValue: (r) => r.version,
        render: (r) => <span className="mono">{r.version}</span>,
      },
      {
        key: 'nodes',
        header: t('Nodes', '节点'),
        sortable,
        sortValue: (r) => r.nodes,
        render: (r) => r.nodes,
      },
      {
        key: 'tags',
        header: t('Tags', '标签'),
        render: (r) => (
          <TagGroup>
            {r.tags
              .filter((tag) => tag.trim())
              .map((tag) => (
                <Tag key={tag} tone="neutral">
                  {tag}
                </Tag>
              ))}
          </TagGroup>
        ),
      },
      {
        key: 'actions',
        header: t('Actions', '操作'),
        emptyPlaceholder: false,
        render: (r) => (
          <div className="actions" onClick={(e) => e.stopPropagation()}>
            <Button size="sm" onClick={() => toast(t(`Open ${r.name}`, `打开 ${r.name}`), 'info')}>
              {t('Open', '打开')}
            </Button>
            <Button
              size="sm"
              onClick={() => toast(t(`Diagnose ${r.name} (demo)`, `诊断 ${r.name}（示例）`), 'success')}
            >
              {t('Diagnose', '诊断')}
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => toast(t(`Delete ${r.name} (demo)`, `删除 ${r.name}（示例）`), 'error')}
            >
              {t('Delete', '删除')}
            </Button>
          </div>
        ),
      },
    ]
    return cols
  }, [locale, sortable, t, toast])

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
        columnVisibility
        resizableColumns
        selectedKeys={selected}
        onSelectedKeysChange={setSelected}
        bulkActions={
          <>
            <Button
              size="sm"
              onClick={() =>
                toast(t(`Bulk diagnose ${selected.length}`, `批量诊断 ${selected.length} 个`), 'info')
              }
            >
              {t('Bulk diagnose', '批量诊断')}
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                toast(
                  t(`Bulk delete ${selected.length} (demo)`, `批量删除 ${selected.length} 个（示例）`),
                  'warn',
                )
                setSelected([])
              }}
            >
              {t('Bulk delete', '批量删除')}
            </Button>
          </>
        }
        emptyTitle={q ? t('No matching clusters', '无匹配集群') : t('No clusters yet', '还没有集群')}
        emptyDesc={
          q
            ? t(
                `No clusters match “${q}”. Clear filters and try again.`,
                `没有与「${q}」匹配的集群，可清除筛选后重试。`,
              )
            : t('Add servers first, then create a cluster.', '先添加服务器，再创建集群。')
        }
        emptyAction={
          q ? undefined : (
            <Button variant="primary" onClick={() => toast(t('Open create flow (demo)', '打开创建流程（示例）'), 'info')}>
              {t('Create cluster', '创建集群')}
            </Button>
          )
        }
        onRowClick={(r) => toast(t(`Open ${r.name}`, `打开 ${r.name}`), 'info')}
        columns={columns}
      />
    </>
  )
}
