import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Columns3 } from 'lucide-react'
import { Button } from './Button'
import { Card } from './Card'
import { Checkbox } from './Checkbox'
import { EmptyState } from './EmptyState'
import { Popover } from './Popover'
import { Select } from './Select'
import { SkeletonTable } from './Skeleton'
import { Table, type SortDir, type SortValue, type TableColumn } from './Table'
import { TreeTableCell } from './TreeTableCell'

export type DataTableColumn<T> = TableColumn<T> & {
  className?: string
  /** Hide from default visible set; still toggleable when columnVisibility enabled */
  defaultHidden?: boolean
  resizable?: boolean
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
  selectedKeys?: string[]
  onSelectedKeysChange?: (keys: string[]) => void
  bulkActions?: ReactNode
  toolbar?: ReactNode
  defaultSortKey?: string | null
  defaultSortDir?: Exclude<SortDir, null>
  sortKey?: string | null
  sortDir?: SortDir
  onSortChange?: (key: string | null, dir: SortDir) => void
  /**
   * Server-driven mode: skip client sort/slice; pass already-paged `rows`.
   * Provide `total` + controlled `page` / `pageSize` (or callbacks).
   */
  remote?: boolean
  total?: number
  page?: number
  pageSize?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  /** Show column visibility toggles */
  columnVisibility?: boolean
  visibleKeys?: string[]
  onVisibleKeysChange?: (keys: string[]) => void
  /** Enable drag-resize on columns with width / resizable */
  resizableColumns?: boolean
  /**
   * Tree mode: return child rows. Pagination applies to root rows;
   * expanded children render under their parent on the same page.
   */
  getChildren?: (row: T) => T[] | undefined
  /** Column that shows expand control (default: first data column) */
  treeColumnKey?: string
  defaultExpandedKeys?: string[]
  expandedKeys?: string[]
  onExpandedKeysChange?: (keys: string[]) => void
}

type FlatRow<T> = { row: T; depth: number; hasChildren: boolean }

function flattenTree<T>(
  roots: T[],
  getChildren: (row: T) => T[] | undefined,
  rowKey: (row: T) => string,
  expanded: Set<string>,
  depth = 0,
): FlatRow<T>[] {
  const out: FlatRow<T>[] = []
  for (const row of roots) {
    const kids = getChildren(row) ?? []
    out.push({ row, depth, hasChildren: kids.length > 0 })
    if (kids.length && expanded.has(rowKey(row))) {
      out.push(...flattenTree(kids, getChildren, rowKey, expanded, depth + 1))
    }
  }
  return out
}

const DEFAULT_SIZES = [10, 20, 50]

function readSortValue<T>(row: T, col: DataTableColumn<T>): SortValue {
  if (col.sortValue) return col.sortValue(row)
  const record = row as Record<string, unknown>
  const v = record[col.key]
  if (
    v == null ||
    typeof v === 'string' ||
    typeof v === 'number' ||
    typeof v === 'boolean' ||
    v instanceof Date
  ) {
    return v as SortValue
  }
  return String(v)
}

function compareSortValue(a: SortValue, b: SortValue): number {
  if (a == null && b == null) return 0
  if (a == null) return -1
  if (b == null) return 1
  if (a instanceof Date || b instanceof Date) {
    const at = a instanceof Date ? a.getTime() : new Date(String(a)).getTime()
    const bt = b instanceof Date ? b.getTime() : new Date(String(b)).getTime()
    return at === bt ? 0 : at > bt ? 1 : -1
  }
  if (typeof a === 'number' && typeof b === 'number') return a === b ? 0 : a > b ? 1 : -1
  if (typeof a === 'boolean' && typeof b === 'boolean') return a === b ? 0 : a ? 1 : -1
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' })
}

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
  defaultSortKey = null,
  defaultSortDir = 'asc',
  sortKey: sortKeyProp,
  sortDir: sortDirProp,
  onSortChange,
  remote = false,
  total: totalProp,
  page: pageProp,
  pageSize: pageSizeProp,
  onPageChange,
  onPageSizeChange,
  columnVisibility = false,
  visibleKeys: visibleKeysProp,
  onVisibleKeysChange,
  resizableColumns = false,
  getChildren,
  treeColumnKey,
  defaultExpandedKeys = [],
  expandedKeys: expandedKeysProp,
  onExpandedKeysChange,
}: DataTableProps<T>) {
  const [pageInternal, setPageInternal] = useState(1)
  const [pageSizeInternal, setPageSizeInternal] = useState(defaultPageSize)
  const [internalSelected, setInternalSelected] = useState<string[]>([])
  const [internalSortKey, setInternalSortKey] = useState<string | null>(defaultSortKey)
  const [internalSortDir, setInternalSortDir] = useState<SortDir>(defaultSortDir)
  const [widths, setWidths] = useState<Record<string, number>>({})
  const [expandedInternal, setExpandedInternal] = useState<string[]>(defaultExpandedKeys)
  const defaultVisible = useMemo(
    () => columns.filter((c) => !c.defaultHidden).map((c) => c.key),
    [columns],
  )
  const [visibleInternal, setVisibleInternal] = useState<string[]>(defaultVisible)
  const treeMode = Boolean(getChildren)
  const expandedKeys = expandedKeysProp ?? expandedInternal
  const setExpandedKeys = (keys: string[]) => {
    if (expandedKeysProp === undefined) setExpandedInternal(keys)
    onExpandedKeysChange?.(keys)
  }
  const expandedSet = useMemo(() => new Set(expandedKeys), [expandedKeys])

  const selected = selectedKeys ?? internalSelected
  const setSelected = onSelectedKeysChange ?? setInternalSelected
  const selectable = Boolean(onSelectedKeysChange || bulkActions)
  const sortKey = sortKeyProp !== undefined ? sortKeyProp : internalSortKey
  const sortDir = sortDirProp !== undefined ? sortDirProp : internalSortDir
  const page = pageProp ?? pageInternal
  const pageSize = pageSizeProp ?? pageSizeInternal
  const setPage = (next: number) => {
    if (pageProp === undefined) setPageInternal(next)
    onPageChange?.(next)
  }
  const setPageSize = (next: number) => {
    if (pageSizeProp === undefined) setPageSizeInternal(next)
    onPageSizeChange?.(next)
  }
  const visibleKeys = visibleKeysProp ?? visibleInternal
  const setVisibleKeys = (keys: string[]) => {
    if (visibleKeysProp === undefined) setVisibleInternal(keys)
    onVisibleKeysChange?.(keys)
  }
  const sortable = columns.some((c) => c.sortable)

  const visibleColumns = useMemo(() => {
    if (!columnVisibility) return columns
    const set = new Set(visibleKeys)
    return columns.filter((c) => set.has(c.key))
  }, [columnVisibility, columns, visibleKeys])

  const displayColumns = useMemo(() => {
    if (!resizableColumns) return visibleColumns
    return visibleColumns.map((c) => ({
      ...c,
      width: widths[c.key] ?? c.width,
      resizable: c.resizable !== false,
    }))
  }, [resizableColumns, visibleColumns, widths])

  const sortedRows = useMemo(() => {
    if (remote || !sortable || !sortKey || !sortDir) return rows
    const col = columns.find((c) => c.key === sortKey && c.sortable)
    if (!col) return rows
    return [...rows].sort((a, b) => {
      const cmp = compareSortValue(readSortValue(a, col), readSortValue(b, col))
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [columns, remote, rows, sortDir, sortKey, sortable])

  const total = remote ? (totalProp ?? rows.length) : sortedRows.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1)

  useEffect(() => {
    if (remote) return
    setPageInternal((p) => Math.min(p, totalPages))
  }, [remote, totalPages, total, pageSize])

  const rootPageRows = useMemo(() => {
    if (remote) return sortedRows
    const start = (page - 1) * pageSize
    return sortedRows.slice(start, start + pageSize)
  }, [remote, sortedRows, page, pageSize])

  const flatPage = useMemo(() => {
    if (!treeMode || !getChildren) {
      return rootPageRows.map((row) => ({ row, depth: 0, hasChildren: false }))
    }
    return flattenTree(rootPageRows, getChildren, rowKey, expandedSet)
  }, [treeMode, getChildren, rootPageRows, rowKey, expandedSet])

  const pageRows = useMemo(() => flatPage.map((f) => f.row), [flatPage])
  const metaByKey = useMemo(() => {
    const map = new Map<string, FlatRow<T>>()
    for (const f of flatPage) map.set(rowKey(f.row), f)
    return map
  }, [flatPage, rowKey])

  const pageKeys = pageRows.map(rowKey)
  const allPageSelected = pageKeys.length > 0 && pageKeys.every((k) => selected.includes(k))

  function toggleExpand(key: string) {
    setExpandedKeys(
      expandedSet.has(key) ? expandedKeys.filter((k) => k !== key) : [...expandedKeys, key],
    )
  }

  function handleSort(key: string) {
    const col = columns.find((c) => c.key === key)
    if (!col?.sortable) return
    let nextKey: string | null = key
    let nextDir: SortDir = 'asc'
    if (sortKey === key) {
      if (sortDir === 'asc') nextDir = 'desc'
      else if (sortDir === 'desc') {
        nextKey = null
        nextDir = null
      }
    }
    if (sortKeyProp === undefined) setInternalSortKey(nextKey)
    if (sortDirProp === undefined) setInternalSortDir(nextDir)
    onSortChange?.(nextKey, nextDir)
    if (!remote) setPage(1)
  }

  function onColumnResize(key: string, width: number) {
    setWidths((prev) => ({ ...prev, [key]: Math.max(64, width) }))
  }

  const treeColKey = treeColumnKey ?? displayColumns[0]?.key
  const treeColumns = useMemo(() => {
    if (!treeMode || !treeColKey) return displayColumns
    return displayColumns.map((col) => {
      if (col.key !== treeColKey) return col
      const baseRender = col.render
      return {
        ...col,
        render: (row: T) => {
          const key = rowKey(row)
          const meta = metaByKey.get(key)
          return (
            <TreeTableCell
              depth={meta?.depth ?? 0}
              expandable={meta?.hasChildren}
              expanded={expandedSet.has(key)}
              onToggle={() => toggleExpand(key)}
            >
              {baseRender(row)}
            </TreeTableCell>
          )
        },
      }
    })
  }, [treeMode, treeColKey, displayColumns, metaByKey, expandedSet, rowKey, expandedKeys])

  const hasLeftPin = treeColumns.some((c) => c.pinned === 'left')
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
          width: 48,
          /** Stick with other left pins so name isn't sticky at left:0 leaving a gap */
          pinned: hasLeftPin ? 'left' : undefined,
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
        ...treeColumns,
      ]
    : treeColumns

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  const visibilityToolbar = columnVisibility ? (
    <Popover
      trigger={
        <Button size="sm" variant="ghost" aria-label="列显隐">
          <Columns3 size={14} />
          列
        </Button>
      }
    >
      <div className="data-table-col-menu">
        {columns.map((col) => (
          <label key={col.key} className="data-table-col-item">
            <Checkbox
              checked={visibleKeys.includes(col.key)}
              onChange={(e) => {
                const next = e.target.checked
                  ? [...visibleKeys, col.key]
                  : visibleKeys.filter((k) => k !== col.key)
                if (next.length === 0) return
                setVisibleKeys(next)
              }}
            />
            <span>{typeof col.header === 'string' ? col.header : col.key}</span>
          </label>
        ))}
      </div>
    </Popover>
  ) : null

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
      {toolbar || visibilityToolbar ? (
        <div className="data-table-toolbar">
          <div className="data-table-toolbar-main">{toolbar}</div>
          {visibilityToolbar}
        </div>
      ) : null}
      {selected.length && bulkActions ? (
        <div className="data-table-bulk">
          <span>
            已选 <strong>{selected.length}</strong> {unit}
          </span>
          <div className="actions">{bulkActions}</div>
        </div>
      ) : null}
      <Table
        columns={cols}
        rows={pageRows}
        rowKey={rowKey}
        onRowClick={onRowClick}
        sortKey={sortable ? sortKey : undefined}
        sortDir={sortable ? sortDir : undefined}
        onSort={sortable ? handleSort : undefined}
        onColumnResize={resizableColumns ? onColumnResize : undefined}
        rowClassName={
          treeMode
            ? (row) => {
                const meta = metaByKey.get(rowKey(row))
                if (!meta) return undefined
                return meta.hasChildren ? 'pod-tree-root' : meta.depth > 0 ? 'pod-tree-leaf' : undefined
              }
            : undefined
        }
      />
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
            <Button size="sm" disabled={page <= 1} onClick={() => setPage(Math.max(1, page - 1))}>
              上一页
            </Button>
            <Button
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage(Math.min(totalPages, page + 1))}
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
