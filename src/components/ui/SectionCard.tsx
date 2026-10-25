import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Card } from './Card'
import { Heading } from './Heading'

/** Padded card with optional section title — common settings/form pattern */
export function SectionCard({
  title,
  children,
  className,
  actions,
}: {
  title?: ReactNode
  children: ReactNode
  className?: string
  actions?: ReactNode
}) {
  return (
    <Card padded className={cn('stack', className)}>
      {title ? (
        <div className="actions" style={{ justifyContent: 'space-between', width: '100%' }}>
          <Heading level="card">{title}</Heading>
          {actions}
        </div>
      ) : null}
      {children}
    </Card>
  )
}
