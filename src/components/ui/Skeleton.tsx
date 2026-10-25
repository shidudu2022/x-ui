import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

export function Skeleton({ className, style }: { className?: string; style?: CSSProperties }) {
  return <div className={cn('skeleton', className)} style={style} aria-hidden />
}

export function SkeletonTable({ rows = 4 }: { rows?: number }) {
  return (
    <div className="skeleton-table" aria-hidden>
      <div className="skeleton-table-head skeleton" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-table-row skeleton" />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="card card-pad stack" aria-hidden>
      <Skeleton style={{ height: 16, width: '40%' }} />
      <Skeleton style={{ height: 12, width: '80%' }} />
      <Skeleton style={{ height: 12, width: '65%' }} />
    </div>
  )
}
