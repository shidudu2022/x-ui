import type { ReactNode } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Checkbox } from './Checkbox'

export type SortDir = 'asc' | 'desc' | null

export type TableColumn<T> = {
  key: string
  header: ReactNode
  sortable?: boolean
  width?: string | number
  render: (row: T) => ReactNode
}

type TableProps<T> = {
  columns: TableColumn<T>[]
  rows: T[]
  rowKey: (row: T) => string
  sortKey?: string | null
  sortDir?: SortDir
  onSort?: (key: string) => void
  selectable?: boolean
  selectedKeys?: string[]
  onSelectedChange?: (keys: string[]) => void
  onRowClick?: (row: T) => void
  className?: string
  empty?: ReactNode
}

export function Table<T>({
  columns,
  rows,
  rowKey,
  sortKey,
  sortDir,
  onSort,
  selectable,
  selectedKeys = [],
  onSelectedChange,
  onRowClick,
  className,
  empty,
}: TableProps<T>) {
  const allKeys = rows.map(rowKey)
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selectedKeys.includes(k))

  function toggleAll() {
    onSelectedChange?.(allSelected ? [] : allKeys)
  }

  function toggleOne(key: string) {
    onSelectedChange?.(
      selectedKeys.includes(key) ? selectedKeys.filter((k) => k !== key) : [...selectedKeys, key],
    )
  }

  return (
    <table className={cn('table', className)}>
      <thead>
        <tr>
          {selectable ? (
            <th className="row-check">
              <Checkbox checked={allSelected} onChange={toggleAll} aria-label="全选" />
            </th>
          ) : null}
          {columns.map((col) => (
            <th
              key={col.key}
              className={cn(col.sortable && 'sortable')}
              style={col.width ? { width: col.width } : undefined}
              onClick={col.sortable ? () => onSort?.(col.key) : undefined}
            >
              {col.header}
              {col.sortable ? (
                <span className="sort-icon" aria-hidden>
                  {sortKey === col.key && sortDir === 'asc' ? (
                    <ArrowUp size={12} />
                  ) : sortKey === col.key && sortDir === 'desc' ? (
                    <ArrowDown size={12} />
                  ) : (
                    <ArrowUpDown size={12} />
                  )}
                </span>
              ) : null}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length + (selectable ? 1 : 0)}>{empty ?? '暂无数据'}</td>
          </tr>
        ) : (
          rows.map((row) => {
            const key = rowKey(row)
            return (
              <tr
                key={key}
                className={cn(onRowClick && 'clickable')}
                onClick={() => onRowClick?.(row)}
              >
                {selectable ? (
                  <td className="row-check" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedKeys.includes(key)}
                      onChange={() => toggleOne(key)}
                      aria-label="选择行"
                    />
                  </td>
                ) : null}
                {columns.map((col) => (
                  <td key={col.key}>{col.render(row)}</td>
                ))}
              </tr>
            )
          })
        )}
      </tbody>
    </table>
  )
}

export function DataTableFooter({
  summary,
  controls,
}: {
  summary?: ReactNode
  controls?: ReactNode
}) {
  return (
    <div className="data-table-footer">
      {summary ? <div className="data-table-summary">{summary}</div> : <span />}
      {controls ? <div className="data-table-controls">{controls}</div> : null}
    </div>
  )
}
