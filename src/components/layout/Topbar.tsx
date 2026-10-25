import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Topbar({
  title,
  right,
  className,
}: {
  title?: ReactNode
  right?: ReactNode
  className?: string
}) {
  return (
    <header className={cn('topbar', className)}>
      <div className="topbar-title">{title}</div>
      {right ? <div className="topbar-right">{right}</div> : null}
    </header>
  )
}
