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
import { countLeaves, filterTree, TREE_SEED, type TreeRow } from './listSeed'

export function ListTreeTemplate({ q, onClear }: { q: string; onClear: () => void }) {
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
        unit="个"
        onClear={onClear}
      />
      <DataTable
        rows={filtered}
        rowKey={(r) => r.id}
        getChildren={(r) => r.children}
        treeColumnKey="name"
        expandedKeys={expanded}
        onExpandedKeysChange={setExpanded}
        unit="组"
        selectedKeys={selected}
        onSelectedKeysChange={setSelected}
        bulkActions={
          <Button size="sm" onClick={() => toast(`已选 ${selected.length} 项`, 'info')}>
            批量操作
          </Button>
        }
        emptyTitle={q ? '无匹配集群' : '还没有集群'}
        emptyDesc={q ? `没有与「${q}」匹配的结果。` : '先创建命名空间与集群。'}
        onRowClick={(r) => {
          if (r.children?.length) {
            setExpanded((keys) =>
              keys.includes(r.id) ? keys.filter((k) => k !== r.id) : [...keys, r.id],
            )
            return
          }
          toast(`打开 ${r.name}`, 'info')
        }}
        columns={[
          {
            key: 'name',
            header: '名称',
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
            sortable: true,
            sortValue: (r) => r.status,
            render: (r: TreeRow) =>
              r.status === 'group' ? (
                <Muted>{r.children?.length ?? 0} 个集群</Muted>
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
            header: '版本',
            render: (r) => <span className="mono">{r.version}</span>,
          },
          {
            key: 'nodes',
            header: '节点',
            render: (r) => (r.status === 'group' ? '—' : r.nodes),
          },
          {
            key: 'tags',
            header: '标签',
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
        ]}
      />
    </>
  )
}
