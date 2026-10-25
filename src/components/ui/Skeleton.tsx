import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

export function Skeleton({ className, style }: { className?: string; style?: CSSProperties }) {
  return <div className={cn('skeleton', className)} style={style} aria-hidden />
}

export function SkeletonTable({ rows = 4, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="skeleton-table" aria-hidden>
      <div className="skeleton-table-head">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="skeleton-table-cell" style={{ height: 12, width: '70%' }} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-table-row">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton
              key={j}
              className="skeleton-table-cell"
              style={{ height: 14, width: j === 0 ? '85%' : `${55 + ((i + j) % 3) * 12}%` }}
            />
          ))}
        </div>
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
