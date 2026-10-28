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
} from '@/components/ui'
import { useLocale } from '@/i18n'
import { useDemoT } from '@/demo/i18n/useDemoT'
import { countLeaves, filterTree, TREE_SEED, rowNote, type TreeRow } from './listSeed'

export function ListTreeTemplate({ q, onClear }: { q: string; onClear: () => void }) {
  const t = useDemoT()
  const { locale } = useLocale()
  const { toast } = useToast()
  const [selected, setSelected] = useState<string[]>([])
  const [expanded, setExpanded] = useState<string[]>(['ns-prod'])
  const filtered = useMemo(() => filterTree(TREE_SEED, q), [q])
  const leafTotal = useMemo(() => countLeaves(TREE_SEED), [])
  const leafMatched = useMemo(() => countLeaves(filtered), [filtered])

  return (
    <>
      <ListFilterBar
        query={q}
        total={leafTotal}
        matched={leafMatched}
        unit={t('items', '个')}
        onClear={onClear}
      />
      <DataTable
        rows={filtered}
        rowKey={(r) => r.id}
        getChildren={(r) => r.children}
        treeColumnKey="name"
        expandedKeys={expanded}
        onExpandedKeysChange={setExpanded}
        unit={t('groups', '组')}
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
        emptyDesc={
          q
            ? t(`No results match “${q}”.`, `没有与「${q}」匹配的结果。`)
            : t('Create a namespace and clusters first.', '先创建命名空间与集群。')
        }
        onRowClick={(r) => {
          if (r.children?.length) {
            setExpanded((keys) =>
              keys.includes(r.id) ? keys.filter((k) => k !== r.id) : [...keys, r.id],
            )
            return
          }
          toast(t(`Open ${r.name}`, `打开 ${r.name}`), 'info')
        }}
        columns={[
          {
            key: 'name',
            header: t('Name', '名称'),
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
            sortable: true,
            sortValue: (r) => r.status,
            render: (r: TreeRow) =>
              r.status === 'group' ? (
                <Muted>
                  {t(`${r.children?.length ?? 0} clusters`, `${r.children?.length ?? 0} 个集群`)}
                </Muted>
              ) : (
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
            key: 'version',
            header: t('Version', '版本'),
            render: (r) => <span className="mono">{r.version}</span>,
          },
          {
            key: 'nodes',
            header: t('Nodes', '节点'),
            render: (r) => (r.status === 'group' ? '—' : r.nodes),
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
        ]}
      />
    </>
  )
}
