import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type PageTabItem = {
  id: string
  label: ReactNode
  disabled?: boolean
}

/** Detail-page sub-navigation (URL-friendly tabs without panel content). */
export function PageTabs({
  items,
  value,
  onChange,
  className,
}: {
  items: PageTabItem[]
  value: string
  onChange: (id: string) => void
  className?: string
}) {
  return (
    <div className={cn('page-tabs', className)} role="tablist">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          className={cn('page-tab', item.id === value && 'active')}
          aria-selected={item.id === value}
          disabled={item.disabled}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
