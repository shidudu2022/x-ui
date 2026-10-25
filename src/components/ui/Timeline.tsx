import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type TimelineItemData = {
  id: string
  title: ReactNode
  meta?: ReactNode
  content?: ReactNode
}

export function Timeline({
  items,
  className,
}: {
  items: TimelineItemData[]
  className?: string
}) {
  return (
    <div className={cn('timeline', className)}>
      {items.map((item) => (
        <div key={item.id} className="timeline-item">
          <div className="timeline-rail">
            <span className="timeline-dot" />
          </div>
          <div>
            <p className="timeline-title">{item.title}</p>
            {item.meta ? <div className="timeline-meta">{item.meta}</div> : null}
            {item.content}
          </div>
        </div>
      ))}
    </div>
  )
}
