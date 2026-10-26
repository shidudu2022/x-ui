import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

export function Skeleton({ className, style }: { className?: string; style?: CSSProperties }) {
  return <div className={cn('skeleton', className)} style={style} aria-hidden />
}

/** Simple stacked bars — no fake header / column grid. */
export function SkeletonTable({
  rows = 4,
  cols: _cols = 4,
}: {
  rows?: number
  /** Ignored; kept for API compatibility */
  cols?: number
}) {
  return (
    <div className="skeleton-table" aria-hidden>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton
          key={i}
          className="skeleton-table-row"
          style={{ width: i % 3 === 2 ? '72%' : '100%' }}
        />
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
