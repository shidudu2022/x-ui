import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type TabItem = {
  id: string
  label: ReactNode
  content: ReactNode
}

export function Tabs({
  items,
  value,
  onChange,
  className,
}: {
  items: TabItem[]
  value: string
  onChange: (id: string) => void
  className?: string
}) {
  const active = items.find((i) => i.id === value) ?? items[0]
  return (
    <div className={className}>
      <div className="tabs" role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            className={cn('tab', item.id === active?.id && 'active')}
            aria-selected={item.id === active?.id}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="tab-panel active" role="tabpanel">
        {active?.content}
      </div>
    </div>
  )
}
