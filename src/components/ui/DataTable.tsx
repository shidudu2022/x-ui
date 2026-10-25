import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Button } from './Button'
import { Card } from './Card'
import { Checkbox } from './Checkbox'
import { EmptyState } from './EmptyState'
import { Select } from './Select'
import { SkeletonTable } from './Skeleton'
import { Table, type TableColumn } from './Table'

export type DataTableColumn<T> = TableColumn<T> & {
  className?: string
}

type DataTableProps<T> = {
  columns: DataTableColumn<T>[]
  rows: T[]
  rowKey: (row: T) => string
  loading?: boolean
  emptyTitle?: string
  emptyDesc?: string
  emptyAction?: ReactNode
  onRowClick?: (row: T) => void
  pageSizeOptions?: number[]
  defaultPageSize?: number
  unit?: string
  /** Controlled selection */
  selectedKeys?: string[]
  onSelectedKeysChange?: (keys: string[]) => void
  /** Bulk action bar when selection non-empty */
  bulkActions?: ReactNode
  toolbar?: ReactNode
}

const DEFAULT_SIZES = [10, 20, 50]

/** Card + table + pager — aligned with k3s-start/web DataTable (full width). */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  loading = false,
  emptyTitle = '暂无数据',
  emptyDesc,
  emptyAction,
  onRowClick,
  pageSizeOptions = DEFAULT_SIZES,
  defaultPageSize = 10,
  unit = '条',
  selectedKeys,
  onSelectedKeysChange,
  bulkActions,
  toolbar,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [internalSelected, setInternalSelected] = useState<string[]>([])
  const selected = selectedKeys ?? internalSelected
  const setSelected = onSelectedKeysChange ?? setInternalSelected
  const selectable = Boolean(onSelectedKeysChange || bulkActions)

  const total = rows.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1)

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages))
  }, [totalPages, total, pageSize])

  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize
    return rows.slice(start, start + pageSize)
  }, [rows, page, pageSize])

  const pageKeys = pageRows.map(rowKey)
  const allPageSelected = pageKeys.length > 0 && pageKeys.every((k) => selected.includes(k))

  const cols: DataTableColumn<T>[] = selectable
    ? [
        {
          key: '__select',
          header: (
            <Checkbox
              checked={allPageSelected}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelected(Array.from(new Set([...selected, ...pageKeys])))
                } else {
                  setSelected(selected.filter((k) => !pageKeys.includes(k)))
                }
              }}
              aria-label="全选本页"
            />
          ),
          render: (row) => {
            const key = rowKey(row)
            return (
              <Checkbox
                checked={selected.includes(key)}
                onChange={(e) => {
                  setSelected(
                    e.target.checked ? [...selected, key] : selected.filter((k) => k !== key),
                  )
                }}
                aria-label="选择行"
                onClick={(e) => e.stopPropagation()}
              />
            )
          },
        },
        ...columns,
      ]
    : columns

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  if (loading) {
    return (
      <Card>
        <SkeletonTable rows={6} />
      </Card>
    )
  }

  if (total === 0) {
    return (
      <Card>
        <EmptyState title={emptyTitle} description={emptyDesc} action={emptyAction} />
      </Card>
    )
  }

  return (
    <Card className="data-table">
      {toolbar ? <div className="data-table-toolbar">{toolbar}</div> : null}
      {selected.length && bulkActions ? (
        <div className="data-table-bulk">
          <span>
            已选 <strong>{selected.length}</strong> {unit}
          </span>
          <div className="actions">{bulkActions}</div>
        </div>
      ) : null}
      <div className="data-table-scroll">
        <Table columns={cols} rows={pageRows} rowKey={rowKey} onRowClick={onRowClick} />
      </div>
      <div className="data-table-footer">
        <div className="data-table-summary">
          <span>
            共 <strong>{total}</strong> {unit}
            <span className="muted">
              {' '}
              · 显示 {from}–{to}
            </span>
          </span>
          <span className="muted data-table-page-label">
            第 {page} / {totalPages} 页
          </span>
        </div>
        <div className="data-table-controls">
          <label className="data-table-size">
            <span className="muted">每页</span>
            <Select
              size="sm"
              value={String(pageSize)}
              options={pageSizeOptions.map((n) => ({
                value: String(n),
                label: String(n),
              }))}
              onChange={(v) => {
                setPageSize(Number(v))
                setPage(1)
              }}
            />
          </label>
          <div className="actions">
            <Button size="sm" disabled={page <= 1} onClick={() => setPage(1)}>
              首页
            </Button>
            <Button size="sm" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              上一页
            </Button>
            <Button
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              下一页
            </Button>
            <Button size="sm" disabled={page >= totalPages} onClick={() => setPage(totalPages)}>
              末页
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
