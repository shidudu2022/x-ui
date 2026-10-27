import { useMemo, type CSSProperties, type ReactNode } from 'react'
import { RefreshCw } from 'lucide-react'
import { cn } from '@/lib/cn'
import { pageCount } from '@/lib/listQuery'
import { Button, type ButtonVariant } from './Button'
import { Card } from './Card'
import { EmptyState } from './EmptyState'
import { Input } from './Field'
import { ListPage } from './ListPage'
import { Pagination } from './Pagination'
import { Select } from './Select'
import { SkeletonTable } from './Skeleton'
import { Table, type TableColumn } from './Table'

export type ResourceFilterOption = { value: string; label: string }

export type ResourceFilter =
  | {
      key: string
      label: string
      type: 'text'
      placeholder?: string
    }
  | {
      key: string
      label: string
      type: 'select'
      options: ResourceFilterOption[]
    }

export type ResourceColumn<T> = {
  key: string
  header: string
  render: (row: T) => ReactNode
  /** Fixed / preferred column width (px or CSS length). */
  width?: number | string
  headerStyle?: CSSProperties
  /** Muted secondary text (ids, timestamps). */
  muted?: boolean
}

export type ResourceRowAction<T> = {
  key: string
  label: string
  variant?: ButtonVariant
  show?: (row: T) => boolean
  onClick: (row: T) => void | Promise<void>
}

export type ResourceListProps<T> = {
  title?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  columns: ResourceColumn<T>[]
  rows: T[]
  rowKey: (row: T) => string
  loading?: boolean
  filters?: ResourceFilter[]
  /** Draft filter values (controlled) */
  filterValues?: Record<string, string>
  onFilterChange?: (next: Record<string, string>) => void
  onSearch?: () => void
  onRefresh?: () => void
  searchLabel?: string
  toolbar?: ReactNode
  rowActions?: ResourceRowAction<T>[]
  /** Sticky right actions column (wide tables). Default off for dense layouts. */
  pinActions?: boolean
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  pageSizeOptions?: number[]
  emptyTitle?: string
  emptyDesc?: string
  /** Custom table body; skips default columns / rowActions table */
  renderTable?: (ctx: { rows: T[] }) => ReactNode
  className?: string
  /** When false, skip ListPage chrome (embed in existing page) */
  framed?: boolean
}

const DEFAULT_PAGE_SIZES = [10, 20, 50, 100]

/**
 * Controlled resource list shell: filters + refresh + table + pagination.
 * Fetching / permissions stay in the app — pass already-loaded `rows`.
 */
export function ResourceList<T>({
  title,
  description,
  actions,
  columns,
  rows,
  rowKey,
  loading = false,
  filters = [],
  filterValues = {},
  onFilterChange,
  onSearch,
  onRefresh,
  searchLabel = '查询',
  toolbar,
  rowActions = [],
  pinActions = false,
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZES,
  emptyTitle = '暂无数据',
  emptyDesc,
  renderTable,
  className,
  framed = true,
}: ResourceListProps<T>) {
  const pages = pageCount(total, pageSize)
  const safePage = Math.min(Math.max(page, 1), pages)

  const showActions = useMemo(() => {
    if (renderTable || rowActions.length === 0) return false
    if (loading || rows.length === 0) return true
    return rows.some((row) => rowActions.some((a) => (a.show ? a.show(row) : true)))
  }, [loading, renderTable, rowActions, rows])

  const filterBar =
    filters.length || onSearch || toolbar || onRefresh ? (
      <form
        className="resource-list-filters"
        onSubmit={(e) => {
          e.preventDefault()
          onSearch?.()
        }}
      >
        <div className="resource-list-filters-fields">
          {filters.map((filter) => (
            <label className="resource-list-filter" key={filter.key}>
              <span className="resource-list-filter-label">{filter.label}</span>
              {filter.type === 'text' ? (
                <Input
                  size="sm"
                  placeholder={filter.placeholder ?? filter.label}
                  value={filterValues[filter.key] ?? ''}
                  onChange={(e) =>
                    onFilterChange?.({
                      ...filterValues,
                      [filter.key]: e.target.value,
                    })
                  }
                />
              ) : (
                <Select
                  size="sm"
                  block
                  value={filterValues[filter.key] ?? 'all'}
                  options={filter.options}
                  onChange={(value) =>
                    onFilterChange?.({
                      ...filterValues,
                      [filter.key]: value,
                    })
                  }
                />
              )}
            </label>
          ))}
        </div>
        <div className="resource-list-filters-actions">
          {onSearch ? (
            <Button type="submit" size="sm" variant="primary">
              {searchLabel}
            </Button>
          ) : null}
          {toolbar}
        </div>
        {onRefresh ? (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            iconOnly
            className="resource-list-refresh"
            aria-label="刷新"
            title="刷新"
            onClick={onRefresh}
          >
            <RefreshCw size={15} />
          </Button>
        ) : null}
      </form>
    ) : null

  const tableColumns = useMemo((): TableColumn<T>[] => {
    const cols: TableColumn<T>[] = columns.map((col) => ({
      key: col.key,
      header: col.header,
      width: col.width ?? col.headerStyle?.width,
      render: (row: T) =>
        col.muted ? <span className="muted">{col.render(row)}</span> : col.render(row),
    }))
    if (showActions) {
      cols.push({
        key: 'actions',
        header: '操作',
        emptyPlaceholder: false,
        pinned: pinActions ? 'right' : undefined,
        render: (row: T) => {
          const visible = rowActions.filter((a) => (a.show ? a.show(row) : true))
          return (
            <div className="actions" onClick={(e) => e.stopPropagation()}>
              {visible.map((action) => (
                <Button
                  key={action.key}
                  size="sm"
                  variant={
                    action.variant ??
                    (action.label.includes('删除') ? 'danger' : 'secondary')
                  }
                  onClick={() => {
                    void action.onClick(row)
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )
        },
      })
    }
    return cols
  }, [columns, pinActions, rowActions, showActions])

  const tableBody = loading ? (
    <SkeletonTable cols={columns.length + (showActions ? 1 : 0)} rows={Math.min(pageSize, 8)} />
  ) : renderTable ? (
    renderTable({ rows })
  ) : rows.length === 0 ? (
    <EmptyState title={emptyTitle} description={emptyDesc} />
  ) : (
    <Table columns={tableColumns} rows={rows} rowKey={rowKey} />
  )

  const footer = (
    <div className="resource-list-footer">
      <div className="resource-list-footer-meta">
        <span>
          共 <strong>{total}</strong> 条
        </span>
        {onPageSizeChange ? (
          <label className="resource-list-page-size">
            <span className="muted">每页</span>
            <Select
              size="sm"
              value={String(pageSize)}
              options={pageSizeOptions.map((n) => ({
                value: String(n),
                label: String(n),
              }))}
              onChange={(v) => onPageSizeChange(Number(v))}
            />
          </label>
        ) : null}
      </div>
      <Pagination page={safePage} pageCount={pages} onChange={onPageChange} />
    </div>
  )

  const body = (
    <div className={cn('resource-list', className)}>
      {filterBar}
      <Card className="resource-list-panel">
        <div className="resource-list-table" data-loading={loading ? 'true' : undefined}>
          {tableBody}
        </div>
        {footer}
      </Card>
    </div>
  )

  if (!framed) return body

  return (
    <ListPage title={title ?? ''} description={description} actions={actions}>
      {body}
    </ListPage>
  )
}
