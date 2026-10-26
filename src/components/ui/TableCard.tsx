import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Card } from './Card'

/**
 * Single card that embeds a Table / EmptyState / Skeleton —
 * titled head without nesting another Card (unlike SectionCard + DataTable).
 */
export function TableCard({
  title,
  subtitle,
  actions,
  children,
  className,
  footer,
}: {
  title?: ReactNode
  /** Shown to the right of the title in small muted text */
  subtitle?: ReactNode
  actions?: ReactNode
  /** Typically `<Table />`, `<EmptyState />`, or `<SkeletonTable />` */
  children: ReactNode
  className?: string
  footer?: ReactNode
}) {
  const showHead = Boolean(title || subtitle || actions)
  return (
    <Card className={cn('data-table', 'table-card', className)}>
      {showHead ? (
        <div className="table-card-head">
          <div className="section-card-title-row">
            {title ? <div className="section-card-title">{title}</div> : null}
            {subtitle ? <span className="section-card-subtitle">{subtitle}</span> : null}
          </div>
          {actions ? <div className="actions">{actions}</div> : null}
        </div>
      ) : null}
      {children}
      {footer}
    </Card>
  )
}
