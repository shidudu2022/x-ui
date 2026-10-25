import { useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import { Button } from './Button'

export type TransferItem = { key: string; label: string; disabled?: boolean }

export function Transfer({
  data,
  targetKeys,
  onChange,
  titles = ['可选', '已选'],
  className,
}: {
  data: TransferItem[]
  targetKeys: string[]
  onChange?: (keys: string[]) => void
  titles?: [string, string]
  className?: string
}) {
  const [leftSel, setLeftSel] = useState<string[]>([])
  const [rightSel, setRightSel] = useState<string[]>([])

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
      />
    </div>
  )
}

function TransferPanel({
  title,
  items,
  selected,
  onToggle,
}: {
  title: string
  items: TransferItem[]
  selected: string[]
  onToggle: (key: string) => void
}) {
  return (
    <div className="transfer-panel">
      <div className="transfer-panel-head">
        {title}
        <span className="muted">{items.length}</span>
      </div>
      <ul className="transfer-list">
        {items.map((item) => (
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
