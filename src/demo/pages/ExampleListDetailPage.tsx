import { useMemo, useState } from 'react'
import {
  Badge,
  Button,
  CellStack,
  DataTable,
  DescriptionList,
  Drawer,
  ListFilterBar,
  ListPage,
  MetaRow,
  Muted,
  Tag,
  TagGroup,
  Text,
  emptyCell,
  useToast,
  type DataTableColumn,
} from '@/components/ui'
import { useListSearch } from '@/lib/useListSearch'
import { type ClusterRow, filterFlat, FLAT_SEED } from './list/listSeed'

function statusTone(status: ClusterRow['status']) {
  return status === 'running' ? 'success' : status === 'degraded' ? 'warn' : 'neutral'
}

/**
 * List → drawer detail: row action opens a Drawer with the selected record.
 */
export function ExampleListDetailPage() {
  const { toast } = useToast()
  const { q, clear } = useListSearch()
  const [selected, setSelected] = useState<string[]>([])
  const [detail, setDetail] = useState<ClusterRow | null>(null)
  const filtered = filterFlat(FLAT_SEED, q)

  const columns = useMemo((): DataTableColumn<ClusterRow>[] => {
    return [
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
        render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge>,
      },
      {
        key: 'version',
        header: '版本',
        sortable: true,
        sortValue: (r) => r.version,
        render: (r) => <span className="mono">{emptyCell(r.version)}</span>,
      },
      {
        key: 'nodes',
        header: '节点',
        sortable: true,
        sortValue: (r) => r.nodes,
        render: (r) => r.nodes,
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
      {
        key: 'actions',
        header: '操作',
        emptyPlaceholder: false,
        render: (r) => (
          <div className="actions" onClick={(e) => e.stopPropagation()}>
            <Button size="sm" variant="primary" onClick={() => setDetail(r)}>
              详情
            </Button>
            <Button size="sm" onClick={() => toast(`诊断 ${r.name}（示例）`, 'success')}>
              诊断
            </Button>
          </div>
        ),
      },
    ]
  }, [toast])

  return (
    <ListPage
      title="列表详情"
      description="点击「详情」从右侧抽屉查看记录；适合扫列表后快速阅览，无需跳转整页。"
      actions={
        <Button variant="primary" onClick={() => toast('打开创建流程（示例）', 'info')}>
          创建集群
        </Button>
      }
    >
      <ListFilterBar
        query={q}
        total={FLAT_SEED.length}
        matched={filtered.length}
        unit="个"
        onClear={clear}
      />
      <DataTable
        columns={columns}
        rows={filtered}
        rowKey={(r) => r.id}
        unit="个"
        selectedKeys={selected}
        onSelectedKeysChange={setSelected}
        defaultSortKey="name"
        pageSize={10}
        emptyTitle={q ? '无匹配集群' : '还没有集群'}
        emptyDesc={q ? `没有与「${q}」匹配的结果。` : '创建后即可在此浏览并打开详情抽屉。'}
        onRowClick={(r) => setDetail(r)}
      />

      <Drawer
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        title={detail?.name ?? '详情'}
        size="lg"
        footer={
          <div className="actions">
            <Button onClick={() => setDetail(null)}>关闭</Button>
            <Button
              variant="primary"
              onClick={() => {
                if (detail) toast(`已打开 ${detail.name} 完整页（示例）`, 'info')
                setDetail(null)
              }}
            >
              查看完整页
            </Button>
          </div>
        }
      >
        {detail ? (
          <div className="stack">
            <MetaRow>
              <Badge tone={statusTone(detail.status)}>{detail.status}</Badge>
              <Muted>{emptyCell(detail.note)}</Muted>
            </MetaRow>
            <DescriptionList
              items={[
                { label: 'ID', value: <span className="mono">{detail.id}</span> },
                { label: '版本', value: <span className="mono">{emptyCell(detail.version)}</span> },
                { label: '节点', value: detail.nodes },
                {
                  label: '标签',
                  value: emptyCell(
                    <TagGroup>
                      {detail.tags
                        .filter((t) => t.trim())
                        .map((t) => (
                          <Tag key={t} tone="neutral">
                            {t}
                          </Tag>
                        ))}
                    </TagGroup>,
                  ),
                },
              ]}
            />
            <p className="muted" style={{ margin: 0, fontSize: 12 }}>
              抽屉适合摘要与快捷操作；复杂编辑可再进完整详情页。
            </p>
          </div>
        ) : null}
      </Drawer>
    </ListPage>
  )
}
