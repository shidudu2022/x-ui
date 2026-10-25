import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Checkbox } from './Checkbox'

export type ChecklistItem = {
  id: string
  title: ReactNode
  description?: ReactNode
  checked?: boolean
  disabled?: boolean
}

export function Checklist({
  items,
  onChange,
  className,
}: {
  items: ChecklistItem[]
  onChange?: (id: string, checked: boolean) => void
  className?: string
}) {
  return (
    <div className={cn('check-list', className)}>
      {items.map((item) => (
        <label key={item.id} className={cn('check-item', item.disabled && 'is-disabled')}>
          <Checkbox
            checked={Boolean(item.checked)}
            disabled={item.disabled}
            onChange={(e) => onChange?.(item.id, e.target.checked)}
          />
          <span>
            <div className="check-title">{item.title}</div>
            {item.description ? <div className="check-desc muted">{item.description}</div> : null}
          </span>
        </label>
      ))}
    </div>
  )
}
