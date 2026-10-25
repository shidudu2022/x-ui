import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Card } from './Card'

/** Log card with optional toolbar — matches job detail log panel */
export function LogViewer({
  toolbar,
  children,
  height = 360,
  className,
}: {
  toolbar?: ReactNode
  children: ReactNode
  height?: number | string
  className?: string
}) {
  return (
    <Card className={cn(className)}>
      {toolbar ? <div className="log-toolbar">{toolbar}</div> : null}
      <pre className="log" style={{ height, margin: 0 }}>
        {children}
      </pre>
    </Card>
  )
}
