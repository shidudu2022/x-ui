import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Metric({
  label,
  value,
  className,
}: {
  label: ReactNode
  value: ReactNode
  className?: string
}) {
  return (
    <div className={cn('metric', className)}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  )
}

export type MetricGridColumns = 2 | 3 | 4

export function MetricGrid({
  children,
  className,
  columns = 2,
}: {
  children: ReactNode
  className?: string
  /** Desktop columns; collapses to 1 on narrow phones. Default 2. */
  columns?: MetricGridColumns
}) {
  const style = { ['--metric-cols' as string]: String(columns) } as CSSProperties
  return (
    <div className={cn('metric-grid', `cols-${columns}`, className)} style={style}>
      {children}
    </div>
  )
}
