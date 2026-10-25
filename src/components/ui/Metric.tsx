import type { ReactNode } from 'react'
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

export function MetricGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('metric-grid', className)}>{children}</div>
}
