import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { EMPTY_CELL, emptyCell } from '@/lib/emptyCell'
import { Checkbox } from './Checkbox'

export type SortDir = 'asc' | 'desc' | null

export type SortValue = string | number | boolean | null | undefined | Date

export type TableColumnPin = 'left' | 'right'

export type TableColumn<T> = {
  key: string
  header: ReactNode
  /** Enable header sort control for this column */
  sortable?: boolean
  /** Value used when sorting; defaults to `(row as any)[key]` */
  sortValue?: (row: T) => SortValue
  /**
   * Fixed column width. Omit on pinned action columns to size to content
   * (e.g. button count); sticky offsets are measured automatically.
   */
  width?: string | number
  resizable?: boolean
  /** Sticky pin while the table scrolls horizontally */
  pinned?: TableColumnPin
  /**
   * Placeholder when `render` yields empty (null / blank / empty TagGroup…).
   * Default `—`. Pass `false` to keep blanks (e.g. action columns).
   */
  emptyPlaceholder?: ReactNode | false
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
  onColumnResize?: (key: string, width: number) => void
  rowClassName?: (row: T) => string | undefined
  className?: string
  empty?: ReactNode
  /** Hide the column header row (`thead`) */
  hideHeader?: boolean
}

function widthPx(width: string | number | undefined, fallback: number) {
  if (typeof width === 'number' && Number.isFinite(width)) return width
  if (typeof width === 'string') {
    const n = parseFloat(width)
    if (Number.isFinite(n)) return n
  }
  return fallback
}

const SELECT_COL_WIDTH = 48

function isAutoPinnedWidth<T>(col: TableColumn<T> | undefined, key: string) {
  if (key === '__select') return false
  return Boolean(col?.pinned && col.width == null)
}

function columnWidthPx<T>(
  col: TableColumn<T> | undefined,
  key: string,
  measured: Record<string, number>,
) {
  if (key === '__select') return widthPx(col?.width, SELECT_COL_WIDTH)
  if (col?.width != null) return widthPx(col.width, 160)
  if (measured[key]) return measured[key]
  // Provisional until ResizeObserver measures content-sized pinned cols
  return key === 'actions' ? 120 : 160
}

function buildPinStyles<T>(
  columns: TableColumn<T>[],
  selectable: boolean | undefined,
  measured: Record<string, number>,
): Map<string, { side: TableColumnPin; offset: number; edge: boolean }> {
  const map = new Map<string, { side: TableColumnPin; offset: number; edge: boolean }>()
  const leftKeys: string[] = []
  const rightKeys: string[] = []
  const hasLeftPin = columns.some((c) => c.pinned === 'left')
  const selectInColumns = columns.some((c) => c.key === '__select')

  /**
   * DataTable injects `__select` as a real column (selectable prop not passed to Table).
   * Auto-pin it before other left pins so name doesn't sticky at left:0 and leave a hole.
   */
  if (hasLeftPin) {
    if (selectable && !selectInColumns) leftKeys.push('__select')
    for (const col of columns) {
      if (col.key === '__select' || col.pinned === 'left') leftKeys.push(col.key)
    }
  } else {
    for (const col of columns) {
      if (col.pinned === 'left') leftKeys.push(col.key)
    }
  }

  for (const col of columns) {
    if (col.pinned === 'right') rightKeys.push(col.key)
  }

  // Dedupe while preserving order
  const seenLeft = new Set<string>()
  const uniqueLeft = leftKeys.filter((k) => (seenLeft.has(k) ? false : (seenLeft.add(k), true)))

  let left = 0
  uniqueLeft.forEach((key, i) => {
    map.set(key, { side: 'left', offset: left, edge: i === uniqueLeft.length - 1 })
    const col = columns.find((c) => c.key === key)
    left += columnWidthPx(col, key, measured)
  })

  let right = 0
  for (let i = rightKeys.length - 1; i >= 0; i--) {
    const key = rightKeys[i]!
    const col = columns.find((c) => c.key === key)
    const w = columnWidthPx(col, key, measured)
    map.set(key, { side: 'right', offset: right, edge: i === 0 })
    right += w
  }

  return map
}

function pinCellStyle(
  pin: { side: TableColumnPin; offset: number; edge: boolean } | undefined,
  opts?: { header?: boolean },
): CSSProperties | undefined {
  if (!pin) return undefined
  const base = opts?.header ? (pin.side === 'right' ? 7 : 6) : pin.side === 'right' ? 4 : 3
  return {
    position: 'sticky',
    [pin.side]: pin.offset,
    zIndex: base,
  }
}

function widthsEqual(a: Record<string, number>, b: Record<string, number>) {
  const keys = Object.keys(b)
  if (Object.keys(a).length !== keys.length) return false
  return keys.every((k) => a[k] === b[k])
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
  onColumnResize,
  rowClassName,
  className,
  empty,
  hideHeader = false,
}: TableProps<T>) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [measured, setMeasured] = useState<Record<string, number>>({})
  const allKeys = rows.map(rowKey)
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selectedKeys.includes(k))
  const pinMap = useMemo(
    () => buildPinStyles(columns, selectable, measured),
    [columns, selectable, measured],
  )
  const hasPin = pinMap.size > 0
  const autoPinKeys = useMemo(
    () => columns.filter((c) => isAutoPinnedWidth(c, c.key)).map((c) => c.key),
    [columns],
  )

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || autoPinKeys.length === 0) return

    const read = () => {
      const next: Record<string, number> = {}
      for (const key of autoPinKeys) {
        const cells = root.querySelectorAll<HTMLElement>(`[data-col-key="${CSS.escape(key)}"]`)
        let max = 0
        cells.forEach((el) => {
          max = Math.max(max, el.getBoundingClientRect().width)
        })
        if (max > 0) next[key] = Math.ceil(max)
      }
      setMeasured((prev) => (widthsEqual(prev, next) ? prev : next))
    }

    read()
    const ro = new ResizeObserver(read)
    for (const key of autoPinKeys) {
      root.querySelectorAll<HTMLElement>(`[data-col-key="${CSS.escape(key)}"]`).forEach((el) => {
        ro.observe(el)
      })
    }
    return () => ro.disconnect()
  }, [autoPinKeys, columns, rows, hideHeader, selectable])

  function toggleAll() {
    onSelectedChange?.(allSelected ? [] : allKeys)
  }

  function toggleOne(key: string) {
    onSelectedChange?.(
      selectedKeys.includes(key) ? selectedKeys.filter((k) => k !== key) : [...selectedKeys, key],
    )
  }

  return (
    <div ref={rootRef} className={cn('data-table-scroll', hasPin && 'has-pinned-cols')}>
      <table className={cn('table', hasPin && 'has-pinned-cols', className)}>
        {hideHeader ? null : (
          <thead>
            <tr>
              {selectable ? (
                <th
                  className={cn('row-check', pinMap.has('__select') && 'is-pinned-left is-pinned-edge')}
                  style={{
                    ...pinCellStyle(pinMap.get('__select'), { header: true }),
                    ...(pinMap.has('__select')
                      ? {
                          width: SELECT_COL_WIDTH,
                          minWidth: SELECT_COL_WIDTH,
                          maxWidth: SELECT_COL_WIDTH,
                        }
                      : undefined),
                  }}
                >
                  <Checkbox checked={allSelected} onChange={toggleAll} aria-label="全选" />
                </th>
              ) : null}
              {columns.map((col) => (
                <TableHeaderCell
                  key={col.key}
                  col={
                    col.key === '__select' && pinMap.has('__select')
                      ? { ...col, width: col.width ?? SELECT_COL_WIDTH, pinned: col.pinned ?? 'left' }
                      : col
                  }
                  sortKey={sortKey}
                  sortDir={sortDir}
                  onSort={onSort}
                  onColumnResize={onColumnResize}
                  pin={pinMap.get(col.key)}
                  autoWidth={isAutoPinnedWidth(col, col.key)}
                />
              ))}
            </tr>
          </thead>
        )}
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
                  className={cn(onRowClick && 'clickable', rowClassName?.(row))}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable ? (
                    <td
                      className={cn(
                        'row-check',
                        pinMap.has('__select') && 'is-pinned-left is-pinned-edge',
                      )}
                      style={{
                        ...pinCellStyle(pinMap.get('__select')),
                        ...(pinMap.has('__select')
                          ? {
                              width: SELECT_COL_WIDTH,
                              minWidth: SELECT_COL_WIDTH,
                              maxWidth: SELECT_COL_WIDTH,
                            }
                          : undefined),
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        checked={selectedKeys.includes(key)}
                        onChange={() => toggleOne(key)}
                        aria-label="选择行"
                      />
                    </td>
                  ) : null}
                  {columns.map((col) => {
                    const pin = pinMap.get(col.key)
                    const autoWidth = isAutoPinnedWidth(col, col.key)
                    const w =
                      col.width ??
                      (col.key === '__select' && pin ? SELECT_COL_WIDTH : undefined)
                    return (
                      <td
                        key={col.key}
                        data-col-key={autoWidth ? col.key : undefined}
                        className={cn(
                          col.key === '__select' && 'row-check',
                          pin && `is-pinned-${pin.side}`,
                          pin?.edge && 'is-pinned-edge',
                          autoWidth && 'is-pinned-auto',
                        )}
                        style={{
                          ...pinCellStyle(pin),
                          ...(w
                            ? {
                                width: w,
                                minWidth: w,
                                maxWidth: w,
                              }
                            : undefined),
                        }}
                      >
                        {col.emptyPlaceholder === false
                          ? col.render(row)
                          : emptyCell(col.render(row), col.emptyPlaceholder ?? EMPTY_CELL)}
                      </td>
                    )
                  })}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}

function TableHeaderCell<T>({
  col,
  sortKey,
  sortDir,
  onSort,
  onColumnResize,
  pin,
  autoWidth,
}: {
  col: TableColumn<T>
  sortKey?: string | null
  sortDir?: SortDir
  onSort?: (key: string) => void
  onColumnResize?: (key: string, width: number) => void
  pin?: { side: TableColumnPin; offset: number; edge: boolean }
  autoWidth?: boolean
}) {
  const thRef = useRef<HTMLTableCellElement>(null)
  const canResize = Boolean(onColumnResize && col.resizable)

  function startResize(e: ReactMouseEvent) {
    if (!canResize || !thRef.current) return
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startW = thRef.current.getBoundingClientRect().width
    function onMove(ev: MouseEvent) {
      onColumnResize?.(col.key, startW + (ev.clientX - startX))
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  return (
    <th
      ref={thRef}
      data-col-key={autoWidth ? col.key : undefined}
      className={cn(
        col.sortable && 'sortable',
        canResize && 'is-resizable',
        pin && `is-pinned-${pin.side}`,
        pin?.edge && 'is-pinned-edge',
        autoWidth && 'is-pinned-auto',
      )}
      style={{
        ...pinCellStyle(pin, { header: true }),
        ...(col.width
          ? { width: col.width, minWidth: col.width, maxWidth: col.width }
          : undefined),
      }}
      aria-sort={
        col.sortable && sortKey === col.key
          ? sortDir === 'asc'
            ? 'ascending'
            : sortDir === 'desc'
              ? 'descending'
              : 'none'
          : undefined
      }
    >
      {col.sortable ? (
        <button type="button" className="table-sort-btn" onClick={() => onSort?.(col.key)}>
          {col.header}
          <span className="sort-icon" aria-hidden>
            {sortKey === col.key && sortDir === 'asc' ? (
              <ArrowUp size={12} />
            ) : sortKey === col.key && sortDir === 'desc' ? (
              <ArrowDown size={12} />
            ) : (
              <ArrowUpDown size={12} />
            )}
          </span>
        </button>
      ) : (
        col.header
      )}
      {canResize ? (
        <span className="table-col-resizer" onMouseDown={startResize} aria-hidden />
      ) : null}
    </th>
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
