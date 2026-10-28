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
import { useLocale } from '@/i18n'
import { useDemoT } from '@/demo/i18n/useDemoT'
import { type ClusterRow, filterFlat, FLAT_SEED, rowNote } from './list/listSeed'

function statusTone(status: ClusterRow['status']) {
  return status === 'running' ? 'success' : status === 'degraded' ? 'warn' : 'neutral'
}

/**
 * List → drawer detail: row action opens a Drawer with the selected record.
 */
export function ExampleListDetailPage() {
  const t = useDemoT()
  const { locale } = useLocale()
  const { toast } = useToast()
  const { q, clear } = useListSearch()
  const [selected, setSelected] = useState<string[]>([])
  const [detail, setDetail] = useState<ClusterRow | null>(null)
  const filtered = filterFlat(FLAT_SEED, q)

  const columns = useMemo((): DataTableColumn<ClusterRow>[] => {
    return [
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
        render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge>,
      },
      {
        key: 'version',
        header: t('Version', '版本'),
        sortable: true,
        sortValue: (r) => r.version,
        render: (r) => <span className="mono">{emptyCell(r.version)}</span>,
      },
      {
        key: 'nodes',
        header: t('Nodes', '节点'),
        sortable: true,
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
            <Button size="sm" variant="primary" onClick={() => setDetail(r)}>
              {t('Detail', '详情')}
            </Button>
            <Button size="sm" onClick={() => toast(t(`Diagnose ${r.name} (demo)`, `诊断 ${r.name}（示例）`), 'success')}>
              {t('Diagnose', '诊断')}
            </Button>
          </div>
        ),
      },
    ]
  }, [locale, t, toast])

  return (
    <ListPage
      title={t('List with detail drawer', '列表详情')}
      description={t(
        'Click Detail to open a drawer; scan the list without a full-page navigation.',
        '点击「详情」从右侧抽屉查看记录；适合扫列表后快速阅览，无需跳转整页。',
      )}
      actions={
        <Button variant="primary" onClick={() => toast(t('Open create flow (demo)', '打开创建流程（示例）'), 'info')}>
          {t('Create cluster', '创建集群')}
        </Button>
      }
    >
      <ListFilterBar
        query={q}
        total={FLAT_SEED.length}
        matched={filtered.length}
        unit={t('items', '个')}
        onClear={clear}
      />
      <DataTable
        columns={columns}
        rows={filtered}
        rowKey={(r) => r.id}
        unit={t('items', '个')}
        selectedKeys={selected}
        onSelectedKeysChange={setSelected}
        defaultSortKey="name"
        pageSize={10}
        emptyTitle={q ? t('No matching clusters', '无匹配集群') : t('No clusters yet', '还没有集群')}
        emptyDesc={
          q
            ? t(`No results match “${q}”.`, `没有与「${q}」匹配的结果。`)
            : t('Create a cluster to browse and open the detail drawer here.', '创建后即可在此浏览并打开详情抽屉。')
        }
        onRowClick={(r) => setDetail(r)}
      />

      <Drawer
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        title={detail?.name ?? t('Detail', '详情')}
        size="lg"
        footer={
          <div className="actions">
            <Button onClick={() => setDetail(null)}>{t('Close', '关闭')}</Button>
            <Button
              variant="primary"
              onClick={() => {
                if (detail) toast(t(`Opened full page for ${detail.name} (demo)`, `已打开 ${detail.name} 完整页（示例）`), 'info')
                setDetail(null)
              }}
            >
              {t('View full page', '查看完整页')}
            </Button>
          </div>
        }
      >
        {detail ? (
          <div className="stack">
            <MetaRow>
              <Muted>{detail.name}</Muted>
              <Badge tone={statusTone(detail.status)} size="sm">
                {detail.status}
              </Badge>
              <Muted>{emptyCell(rowNote(locale, detail.note))}</Muted>
            </MetaRow>
            <DescriptionList
              items={[
                { label: 'ID', value: <span className="mono">{detail.id}</span> },
                {
                  label: t('Version', '版本'),
                  value: <span className="mono">{emptyCell(detail.version)}</span>,
                },
                { label: t('Nodes', '节点'), value: detail.nodes },
                {
                  label: t('Tags', '标签'),
                  value: emptyCell(
                    <TagGroup>
                      {detail.tags
                        .filter((tag) => tag.trim())
                        .map((tag) => (
                          <Tag key={tag} tone="neutral">
                            {tag}
                          </Tag>
                        ))}
                    </TagGroup>,
                  ),
                },
              ]}
            />
            <p className="muted" style={{ margin: 0, fontSize: 12 }}>
              {t(
                'Drawers suit summaries and quick actions; complex edits can use a full detail page.',
                '抽屉适合摘要与快捷操作；复杂编辑可再进完整详情页。',
              )}
            </p>
          </div>
        ) : null}
      </Drawer>
    </ListPage>
  )
}
