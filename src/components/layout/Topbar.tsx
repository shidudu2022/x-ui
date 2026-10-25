import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Topbar({
  leading,
  title,
  right,
  className,
}: {
  leading?: ReactNode
  title?: ReactNode
  right?: ReactNode
  className?: string
}) {
  return (
    <header className={cn('topbar', className)}>
      <div className="topbar-left">
        {leading}
        <div className="topbar-title">{title}</div>
      </div>
      {right ? <div className="topbar-right">{right}</div> : null}
    </header>
  )
}
