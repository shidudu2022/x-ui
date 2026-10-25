import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type NotificationItem = {
  id: string
  title: ReactNode
  description?: ReactNode
  time?: ReactNode
  unread?: boolean
  tone?: 'info' | 'success' | 'warn' | 'danger'
}

export function NotificationList({
  items,
  onItemClick,
  empty = '暂无通知',
  className,
}: {
  items: NotificationItem[]
  onItemClick?: (item: NotificationItem) => void
  empty?: ReactNode
  className?: string
}) {
  if (!items.length) {
    return <div className={cn('notification-list is-empty muted', className)}>{empty}</div>
  }
  return (
    <ul className={cn('notification-list', className)}>
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            className={cn('notification-item', item.unread && 'is-unread', item.tone && `tone-${item.tone}`)}
            onClick={() => onItemClick?.(item)}
          >
            <div className="notification-main">
              <strong>{item.title}</strong>
              {item.description ? <p>{item.description}</p> : null}
            </div>
            {item.time ? <span className="notification-time muted">{item.time}</span> : null}
          </button>
        </li>
      ))}
    </ul>
  )
}
