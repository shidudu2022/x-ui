import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button } from './Button'
import { Input } from './Field'

export type TransferItem = { key: string; label: string; disabled?: boolean }

export function Transfer({
  data,
  targetKeys,
  onChange,
  titles = ['可选', '已选'],
  searchable = true,
  className,
}: {
  data: TransferItem[]
  targetKeys: string[]
  onChange?: (keys: string[]) => void
  titles?: [string, string]
  searchable?: boolean
  className?: string
}) {
  const [leftSel, setLeftSel] = useState<string[]>([])
  const [rightSel, setRightSel] = useState<string[]>([])
  const [leftQ, setLeftQ] = useState('')
  const [rightQ, setRightQ] = useState('')

  const left = useMemo(() => data.filter((d) => !targetKeys.includes(d.key)), [data, targetKeys])
  const right = useMemo(() => data.filter((d) => targetKeys.includes(d.key)), [data, targetKeys])

  function toggle(list: string[], key: string, set: (v: string[]) => void) {
    set(list.includes(key) ? list.filter((k) => k !== key) : [...list, key])
  }

  return (
    <div className={cn('transfer', className)}>
      <TransferPanel
        title={titles[0]}
        items={left}
        selected={leftSel}
        onToggle={(k) => toggle(leftSel, k, setLeftSel)}
        searchable={searchable}
        query={leftQ}
        onQuery={setLeftQ}
      />
      <div className="transfer-actions">
        <Button
          size="sm"
          disabled={!leftSel.length}
          onClick={() => {
            onChange?.([...targetKeys, ...leftSel])
            setLeftSel([])
          }}
        >
          →
        </Button>
        <Button
          size="sm"
          disabled={!rightSel.length}
          onClick={() => {
            onChange?.(targetKeys.filter((k) => !rightSel.includes(k)))
            setRightSel([])
          }}
        >
          ←
        </Button>
      </div>
      <TransferPanel
        title={titles[1]}
        items={right}
        selected={rightSel}
        onToggle={(k) => toggle(rightSel, k, setRightSel)}
        searchable={searchable}
        query={rightQ}
        onQuery={setRightQ}
      />
    </div>
  )
}

function TransferPanel({
  title,
  items,
  selected,
  onToggle,
  searchable,
  query,
  onQuery,
}: {
  title: string
  items: TransferItem[]
  selected: string[]
  onToggle: (key: string) => void
  searchable?: boolean
  query: string
  onQuery: (q: string) => void
}) {
  const q = query.trim().toLowerCase()
  const filtered = q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items

  return (
    <div className="transfer-panel">
      <div className="transfer-panel-head">
        {title}
        <span className="muted">{filtered.length}</span>
      </div>
      {searchable ? (
        <div className="transfer-search">
          <Search size={14} aria-hidden />
          <Input
            size="sm"
            value={query}
            placeholder="搜索…"
            aria-label={`${title}搜索`}
            onChange={(e) => onQuery(e.target.value)}
          />
        </div>
      ) : null}
      <ul className="transfer-list">
        {filtered.map((item) => (
          <li key={item.key}>
            <label className={cn('transfer-item', item.disabled && 'is-disabled')}>
              <input
                type="checkbox"
                checked={selected.includes(item.key)}
                disabled={item.disabled}
                onChange={() => onToggle(item.key)}
              />
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
