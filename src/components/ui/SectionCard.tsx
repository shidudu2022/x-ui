import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Card } from './Card'

/** Padded card with optional section title — common settings/form pattern */
export function SectionCard({
  title,
  subtitle,
  children,
  className,
  actions,
}: {
  title?: ReactNode
  /** Shown to the right of the title in small muted text */
  subtitle?: ReactNode
  children: ReactNode
  className?: string
  actions?: ReactNode
}) {
  const showHead = Boolean(title || subtitle || actions)
  return (
    <Card padded className={cn('stack', className)}>
      {showHead ? (
        <div className="section-card-head">
          <div className="section-card-title-row">
            {title ? <div className="section-card-title">{title}</div> : null}
            {subtitle ? <span className="section-card-subtitle">{subtitle}</span> : null}
          </div>
          {actions ? <div className="actions">{actions}</div> : null}
        </div>
      ) : null}
      {children}
    </Card>
  )
}
