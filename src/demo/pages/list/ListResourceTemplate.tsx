import { useMemo, useState } from 'react'
import {
  ListFilterBar,
  MeterBar,
  meterToneFromPct,
  ResourceList,
  StatusDot,
  useToast,
} from '@/components/ui'
import { useDemoT } from '@/demo/i18n/useDemoT'
import { defaultFilterRow, slicePage } from '@/lib/listQuery'
import { FLAT_SEED, filterFlat, type ClusterRow } from './listSeed'

function cpuOf(row: ClusterRow) {
  return (Number(row.id) * 17 + row.nodes * 11) % 100
}

/** ResourceList shell — filters + table + pagination (ops console list pattern). */
export function ListResourceTemplate({ q, onClear }: { q: string; onClear: () => void }) {
  const t = useDemoT()
  const { toast } = useToast()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [draft, setDraft] = useState<Record<string, string>>({ q: '', status: 'all' })
  const [applied, setApplied] = useState<Record<string, string>>({ q: '', status: 'all' })

  const base = useMemo(() => filterFlat(FLAT_SEED, q), [q])
  const filtered = useMemo(
    () => base.filter((row) => defaultFilterRow(row, applied)),
    [applied, base],
  )
  const rows = useMemo(() => slicePage(filtered, page, pageSize), [filtered, page, pageSize])

  return (
    <>
      <ListFilterBar
        query={q}
        total={FLAT_SEED.length}
        matched={filtered.length}
        unit={t('items', '个')}
        onClear={onClear}
      />
      <ResourceList
        framed={false}
        rows={rows}
        rowKey={(r) => r.id}
        page={page}
        pageSize={pageSize}
        total={filtered.length}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setPage(1)
        }}
        filterValues={draft}
        onFilterChange={setDraft}
        onSearch={() => {
          setApplied({ ...draft })
          setPage(1)
        }}
        onRefresh={() => toast(t('Refreshed', '已刷新'), 'info')}
        filters={[
          { key: 'q', label: t('Keyword', '关键词'), type: 'text', placeholder: t('Name', '名称') },
          {
            key: 'status',
            label: t('Status', '状态'),
            type: 'select',
            options: [
              { value: 'all', label: t('All', '全部') },
              { value: 'running', label: 'running' },
              { value: 'degraded', label: 'degraded' },
              { value: 'stopped', label: 'stopped' },
            ],
          },
        ]}
        columns={[
          {
            key: 'name',
            header: t('Name', '名称'),
            render: (r) => (
              <span className="mono" title={r.name}>
                {r.name}
              </span>
            ),
          },
          {
            key: 'status',
            header: t('Status', '状态'),
            width: 120,
            render: (r) => (
              <>
                <StatusDot
                  tone={
                    r.status === 'running' ? 'ok' : r.status === 'stopped' ? 'bad' : 'warn'
                  }
                />
                {r.status}
              </>
            ),
          },
          {
            key: 'cpu',
            header: 'CPU',
            width: 140,
            render: (r) => {
              const cpu = cpuOf(r)
              return (
                <MeterBar value={cpu} tone={meterToneFromPct(cpu)} aria-label={`CPU ${cpu}%`} />
              )
            },
          },
        ]}
        rowActions={[
          {
            key: 'edit',
            label: t('Edit', '编辑'),
            onClick: (r) => toast(t(`Edit ${r.name}`, `编辑 ${r.name}`), 'info'),
          },
          {
            key: 'delete',
            label: t('Delete', '删除'),
            variant: 'danger',
            onClick: (r) => toast(t(`Delete ${r.name}`, `删除 ${r.name}`), 'warn'),
          },
        ]}
      />
    </>
  )
}
