import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type DescriptionItem = {
  label: ReactNode
  value: ReactNode
}

export function DescriptionList({
  items,
  className,
}: {
  items: DescriptionItem[]
  className?: string
}) {
  return (
    <dl className={cn('kv', className)}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'contents' }}>
          <dt className="kv-label">{item.label}</dt>
          <dd className="kv-value" style={{ margin: 0 }}>
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function MetaRow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('meta-row', className)}>{children}</div>
}
