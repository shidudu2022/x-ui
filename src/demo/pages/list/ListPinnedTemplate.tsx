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
  CellStack,
  emptyCell,
  useToast,
  type DataTableColumn,
} from '@/components/ui'
import { useLocale } from '@/i18n'
import { useDemoT } from '@/demo/i18n/useDemoT'
import { type ClusterRow, filterFlat, FLAT_SEED, rowNote } from './listSeed'

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
  const t = useDemoT()
  const { locale } = useLocale()
  const { toast } = useToast()
  const [selected, setSelected] = useState<string[]>([])
  const filtered = filterFlat(FLAT_SEED, q).map(padRow)

  const columns: DataTableColumn<PinnedRow>[] = useMemo(
    () => [
      {
        key: 'name',
        header: t('Name', '名称'),
        pinned: 'left',
        width: 180,
        sortable: true,
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
        header: t('Region', '区域'),
        width: 120,
        render: (r) => <span className="mono">{r.region}</span>,
      },
      {
        key: 'owner',
        header: t('Owner', '负责人'),
        width: 100,
        render: (r) => r.owner,
      },
      {
        key: 'version',
        header: t('Version', '版本'),
        width: 140,
        render: (r) => <span className="mono">{r.version}</span>,
      },
      {
        key: 'nodes',
        header: t('Nodes', '节点'),
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
        header: t('Memory', '内存'),
        width: 80,
        render: (r) => r.mem,
      },
      {
        key: 'updated',
        header: t('Updated', '更新'),
        width: 120,
        render: (r) => <span className="mono">{r.updated}</span>,
      },
      {
        key: 'tags',
        header: t('Tags', '标签'),
        width: 140,
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
        pinned: 'right',
        emptyPlaceholder: false,
        render: (r) => (
          <div className="actions" onClick={(e) => e.stopPropagation()}>
            <Button size="sm" onClick={() => toast(t(`Open ${r.name}`, `打开 ${r.name}`), 'info')}>
              {t('Open', '打开')}
            </Button>
            <Button size="sm" onClick={() => toast(t(`Diagnose ${r.name}`, `诊断 ${r.name}`), 'success')}>
              {t('Diagnose', '诊断')}
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => toast(t(`Delete ${r.name}`, `删除 ${r.name}`), 'error')}
            >
              {t('Delete', '删除')}
            </Button>
          </div>
        ),
      },
    ],
    [locale, t, toast],
  )

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
        selectedKeys={selected}
        onSelectedKeysChange={setSelected}
        bulkActions={
          <Button
            size="sm"
            onClick={() => toast(t(`${selected.length} selected`, `已选 ${selected.length} 项`), 'info')}
          >
            {t('Bulk actions', '批量操作')}
          </Button>
        }
        emptyTitle={q ? t('No matching clusters', '无匹配集群') : t('No clusters yet', '还没有集群')}
        emptyDesc={t(
          'When scrolling horizontally, the name column and actions stay pinned.',
          '横向滚动时，左侧名称与右侧操作列保持固定。',
        )}
        onRowClick={(r) => toast(t(`Open ${r.name}`, `打开 ${r.name}`), 'info')}
        columns={columns}
      />
    </>
  )
}
