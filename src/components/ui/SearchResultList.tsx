import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Button } from './Button'
import { Tag } from './Tag'

export type SearchResultItemData = {
  id: string
  title: ReactNode
  description?: ReactNode
  type?: string
  href?: string
  active?: boolean
  actionLabel?: string
  onSelect?: () => void
}

export function SearchResultList({
  items,
  className,
}: {
  items: SearchResultItemData[]
  className?: string
}) {
  return (
    <ul className={cn('search-result-list', className)}>
      {items.map((item) => (
        <li key={item.id}>
          <SearchResultItem {...item} />
        </li>
      ))}
    </ul>
  )
}

export function SearchResultItem({
  title,
  description,
  type,
  href,
  active,
  actionLabel = '打开',
  onSelect,
}: SearchResultItemData) {
  if (onSelect && !href) {
    return (
      <button
        type="button"
        className={cn('search-result-item', active && 'active')}
        onClick={onSelect}
      >
        {type ? <Tag tone="neutral">{type}</Tag> : null}
        <span className="search-result-main">
          <strong>{title}</strong>
          {description ? <span className="muted">{description}</span> : null}
        </span>
      </button>
    )
  }

  return (
    <div className={cn('search-result-item', active && 'active')}>
      {type ? <Tag tone="neutral">{type}</Tag> : null}
      <span className="search-result-main">
        <strong>{title}</strong>
        {description ? <span className="muted">{description}</span> : null}
      </span>
      {href ? (
        <Button size="sm" href={href} onClick={onSelect}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
